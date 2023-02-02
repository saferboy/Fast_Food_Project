import{ Client }  from "pg"


export const client = new Client({
    connectionString: process.env.DATABASE_URL,
})


async function connect() {
    try{
        await client.connect()
        console.log("Connected database")
    }
    catch(err) {
        console.error("Cannot connect to Database", err)
    }
}

connect()


// export default clientConnect