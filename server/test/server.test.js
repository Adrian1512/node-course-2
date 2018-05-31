const {app} = require('./../server');
const expect = require('expect');
const request  = require('supertest');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => {
                done(e);
            });
        })
    })
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () =>{
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
        .get(`/todos/${new ObjectID ().toHexString()}`)
        .expect(404)
        .end(done)
    })
    it('should return 404 if for non-objects ids', (done) => {
        request(app)
        .get(`/todos/1`)
        .expect(404)
        .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => { 
        let hex = todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${hex}`)
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.findById(hex).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => {
                done(e);
            });
        });

    });
    it('should return 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${new ObjectID ().toHexString()}`)
        .expect(404)
        .end(done)
    })
    it('should return 404 if for non-objects ids', (done) => {
        request(app)
        .delete(`/todos/1`)
        .expect(404)
        .end(done);
    });
});

describe('Patch /todos/:id', () => {
    it('should update todo', (done) => { 
        let hex = todos[0]._id.toHexString();
        let body = 
        request(app)
        .patch(`/todos/${hex}`)
        .send({
            text: "update from test 2",
            completed: true
        })
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe("update from test 2");
            expect(res.body.todo.completed).toBe(true);
             expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);


    });
    it('should clear completedAt when todo is not complete', (done) => { 
        let hex = todos[1]._id.toHexString();
        let body = 
        request(app)
        .patch(`/todos/${hex}`)
        .send({
            text: "update from test 2",
            completed: false
        })
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe("update from test 2");
            expect(res.body.todo.completed).toBe(false);
            // expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);


    });

});


describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect( (res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email)
            })
            .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect( (res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('POST /users', () => {
    it("should create a user", (done) => {
        let email = "example@example.com";
        let password = '123abc'
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
                expect(res.body._id).toBeDefined();
                expect(res.body.email).toBe(email);
                
            })
            .end((err) => {
                if(err){
                    return done(err);
                }
                User.findOne({email}).then( (user) => {
                    expect(user).toBeDefined();
                    expect(user.password).not.toBe(password);
                    done();
                }).catch((e) => done(e)) ;
            });
    });
    it("should return validation errors if request invalid", (done) => {
        let email = "example";
        let password = '123a'
        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    });
    it("should not create user if email in use", (done) => {
        let email = "adrian@gmail.com";
        let password = '123abc'
        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done)
    });
});

describe('POST /userss/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();

            })
            .end((err, res) => {
                if(err){
                    done(err);
                }
               User.findById(users[1]._id).then((user) => {
                   expect(user.tokens[0]).toMatchObject({
                       access: 'auth',
                       token: res.headers['x-auth']
                   });
                   done();
               }).catch((e) => done(e)) 
            });
    });
    it('should reject invalid ', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: '12345'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeUndefined();

        })
        .end((err, res) => {
            if(err){
                done(err);
            }
           User.findById(users[1]._id).then((user) => {
               expect(user.tokens.length).toBe(0);
               done();
           }).catch((e) => done(e)) 
        });
    });
});