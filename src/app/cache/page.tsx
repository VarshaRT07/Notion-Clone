import React from 'react'

async function todos() {
    let res= await fetch("https://jsonplaceholder.typicode.com/todos/1")
    let data = await res.json()
    console.log("response")
    return <p>{data}</p>
}
export default async function CachePage() {
    
    const data = await todos()
    console.log(data)
  return (
    <>
    <div>CachePage</div>
    </>
  )
}
