const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const postsModel = require("../models/posts_model");

const testPosts = [
    {
        title: "Test Post 1",
        content: "Test Content 1",
        owner: "Noam"
    },
    {
        title: "Test Post 2",
        content: "Test Content 2",
        owner: "Noam2"
    }
]

beforeAll(async ()=>{
    console.log('Before all tests');
    await postsModel.deleteMany();
});

afterAll(()=>{
    console.log('After all tests');
    mongoose.connection.close();
});

describe("Posts Test", ()=>{
    test("Test get all post empty", async ()=>{
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test create new post", async ()=>{
        for(let post of testPosts){
        const response = await request(app).post("/posts").send(post);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(post.title);
        expect(response.body.content).toBe(post.content);
        expect(response.body.owner).toBe(post.owner);
        }
    });

    test("Test get all post", async ()=>{
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
    });
});