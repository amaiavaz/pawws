const fs = require('fs');
const path = require('path');

const deleteFile = (file, folder) => {
    const filePath = path.join(__dirname, ('../public/images'), folder, file);
    fs.unlink(filePath, (errFile)=>{
        if(errFile){
            console.log(errFile);
            throw errFile;
        }else{
            console.log("archivo borrado correctamente");
            
        }
    })
    return;
}

module.exports = deleteFile;