import React from "react";

export async function getStaticProps({params}){
    const res = await fetch( `http://localhost:3000/product/${params.id}`)
const product = await res.json();
}