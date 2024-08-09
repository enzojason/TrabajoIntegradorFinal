import React from "react";

class Artista{
    constructor(id, created_at, updated_at, name, bio, website, image, owner, songs=[]){
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.name = name;
        this.bio = bio;
        this.website = website;
        this.image = image;
        this.owner = owner;
        this.songs  = songs;
    }
    render(){
        return (
            <div>
                <h1>ARTISTA: {this.name}</h1>
            </div>
        );
    }
}