let express = require("express");
let app = express();
require("dotenv").config()
let axios = require("axios")

app.get('/users',async(req,res)=>{

    console.log('hi')
    axios.post('http://20.244.56.144/test/auth',{
        "companyName": "karpagam",
        "clientID": "8458a852-6baf-47e3-8c89-bda3db97cbbd",
        "clientSecret": "ZDHqcbgNCKUmZhhA",
        "ownerName": "sakthi kumar",
        "ownerEmail": "717822p145@kce.ac.in",
        "rollNo": "717822p145"
    }).then((data)=>{
        axios.get('http://20.244.56.144/test/users',{
            headers : { Authorization : `Bearer ${data.data.access_token}`}
        }).then(data=>processTopFiveUsersData(data)).then(data=>res.json({data : data}))
    });
    
})

async function processTopFiveUsersData(data){


    let userArray = [];
    let count = data.data.users.length;

    for(let user in data.data.users){
        await axios.post('http://20.244.56.144/test/auth',{
            "companyName": "karpagam",
            "clientID": "8458a852-6baf-47e3-8c89-bda3db97cbbd",
            "clientSecret": "ZDHqcbgNCKUmZhhA",
            "ownerName": "sakthi kumar",
            "ownerEmail": "717822p145@kce.ac.in",
            "rollNo": "717822p145"
        }).then((data)=>{
            axios.get(`http://20.244.56.144/test/users/${user}/posts`,{
                headers : { Authorization : `Bearer ${data.data.access_token}`}
            }).then(data=>userArray.push([data.data.posts.length,user]));
        });
    }

    userArray = userArray.sort((a,b)=>b[0]-a[0]).map(val=>val[1]).splice(5,userArray.length);
    return userArray;
}

app.get('/posts',async(req,res)=>{

})

app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`);
})