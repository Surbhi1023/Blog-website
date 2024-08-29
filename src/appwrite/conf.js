import config from '../config/config.js'
import {Client, ID, Databases, Storage, Query} from "appwrite"


export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title, slug, featuredImage, status,
    userId}){

        try{
            return await this.databases.createDocument(
                config.appwriteCollectionId, 
                config.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch(error){
            console.log("Appwrite serive ::  createPost :: error", error);
        }

    }

    async updatePost(slug, {title, content, featuredImage, status}){

        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Appwrite serive :: updatePost :: error", error)
        }
    }

    async deletePost(slug)
    {
        try{
            await this.databases.deleteDocument(
                config.appwriteCollectionId,
                config.appwriteDatabaseId,
                slug
            )
            return true
        }
        catch(error){
            console.log("Appwrite serive :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug)
    {
        try{
            return await this.databases.deleteDocument(
                config.appwriteCollectionId,
                config.appwriteDatabaseId,
                slug
            )
        }
        catch(error){
            console.log("Appwrite serive :: getPost :: error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){

        try{
            return await this.databases.listDocuments(
                config.appwriteCollectionId,
                config.appwriteDatabaseId,
                queries,
                
            )

        }
        catch(error){
            console.log("Appwrite serive :: getPost :: error", error)
            return false
        }
    }

    //file upload service
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite serive :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(error){
            console.log("appwrite serive :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}


const service=new Service()
export default service