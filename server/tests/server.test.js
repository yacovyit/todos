const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [
    {
        _id: new ObjectID(),
        text: "First test todo"      
    },
    {
        _id: new ObjectID(),
        text: "Second test todo",
        completed: true,
        completedAt: 333
    }
];
const users = [
    {
    email:"test@gmail.com",
    password: "123456"
    }
]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
    User.remove({}).then(()=>{
        return User.insertMany(users);
    });
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = 'test todo text';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }else{
                Todo.find({text}).then((todos) =>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=> done(e));
            }
        })
    });
    it('should not create todo with invalid body data' ,(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if (err){
                return err;
            }else{
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=> done(e));
            }
        })
    });
});

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);     
    });
});

describe('GET /todos/:id',()=>{
    it('should return todo by id',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });
    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids',(done)=>{
        //todos/123
        var id = "123abc";
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);

    });
})

describe('Delete /todos/:id',()=>{
    it('should remove todo item',(done)=>{
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId); 
        })
        .end((err,res)=>{
            if (err){
                return done(err);
            }
            Todo.findById(hexId).then((todo)=>{
                expect(todo).toNotExist();  
                done();  
            }).catch((e)=>done(e));
            //query data base using findById toNotExist
            //expect (null).toNotExist();
        });

    });
    it ('should return 404 if todo item not found',(done)=>{
        var idHex = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${idHex}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if object id is not valid',(done)=>{
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        //gragb id of the first item
        var hexId = todos[0]._id.toHexString();
        var text = "completed task";
        var completed = true;
        request(app)
        .patch(`/todos/${hexId}`)
        .send({text, completed})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(completed);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end((err,res)=>{
            if (err){
                return done(err);
            }
            Todo.findById(hexId).then((todo)=>{
                expect(todo._id.toHexString()).toBe(hexId);
                expect(todo.text).toBe(text);
                expect(todo.completed).toBe(completed);
                expect(todo.completedAt).toBeA('number');
                done();
            }).catch((e)=>done(e));
        });
        //update text , set commpleted true
        //200
        //text is chenched, complited is true,completeAt is number
    });
    it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second todo item 
        var hexId = todos[1]._id.toHexString();
         //update text, set completed to false
        var text = 'text is updated from test';
        var commpleted = false;
        request(app)
        .patch(`/todos/${hexId}`)
        .send({text,commpleted})
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.commpleted).toNotExist();
            expect(res.body.todo.completedAt).toNotExist();

        }).end((err,res) => {
            if (err){
                return done(err);
            }
            Todo.findById(hexId).then((todo)=>{
                expect(res.body.todo._id).toBe(hexId);
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.commpleted).toNotExist();
                expect(res.body.todo.completedAt).toNotExist();
                done();
            })
            .catch((e) => done(e));
        });
       

        //200
        //text is chanched ,completedAs is null,tonotexist
    });
});
describe('PST /users',() => {
    it('shuld create a new user', (done)=>{
        var user = {
            email: "user@gmail.com",
            password: "123456"
        }
        request(app)
        .post('/users')
        .send(user)
        .expect(200)
        .expect((res)=>{
            expect(res.body.user.email).toBe(user.email);
            expect(res.body.user.password).toBe(user.password);
        })
        .end((err,res)=>{
           if(err)
           {
               return done(err);
           }
           User.find({email:user.email}).then((users)=>{
               expect(users.length).toBe(1);
               expect(users[0].email).toBe(user.email);
               done();
           }).catch((e)=> done(e));
        })
    });
    it('shuld not create a duplicate user', (done)=>{
        request(app)
        .post('/users')
        .send(users[0])
        .expect(400)
        .end(done)
    })
});