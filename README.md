# nestjs9-typeorm-relationship-cascades
* Ejemplo del  create-user-posts 

```
{
  "username":"paco2",
  "password":"123456",
  "password_confirmation":"123456",
  "posts": [
    {
  "title":"teruel",
  "description":"teruel no tiene la sagrada familia"
},{
  "title":"teruel2",
  "description":"teruel2 no tiene la sagrada familia"
}
    ]
}
```

# Using cascades to automatically save related objects
We can set up cascade options in our relations, in the cases when we want our related object to be saved whenever the other object is saved. Let's change our photo's @OneToOne decorator a bit:
```
export class Photo {
    // ... other columns

    @OneToOne(() => PhotoMetadata, (metadata) => metadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata
}
```
Using cascade allows us not to separately save photo and separately save metadata objects now. Now we can simply save a photo object, and the metadata object will be saved automatically because of cascade options.
```
import { AppDataSource } from "./index"

// create photo object
const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.isPublished = true

// create photo metadata object
const metadata = new PhotoMetadata()
metadata.height = 640
metadata.width = 480
metadata.compressed = true
metadata.comment = "cybershoot"
metadata.orientation = "portrait"

photo.metadata = metadata // this way we connect them

// get repository
const photoRepository = AppDataSource.getRepository(Photo)

// saving a photo also save the metadata
await photoRepository.save(photo)
```
console.log("Photo is saved, photo metadata is saved too.")
Notice that we now set the photo's metadata property, instead of the metadata's photo property as before. The cascade feature only works if you connect the photo to its metadata from the photo's side. If you set the metadata's side, the metadata would not be saved automatically.
