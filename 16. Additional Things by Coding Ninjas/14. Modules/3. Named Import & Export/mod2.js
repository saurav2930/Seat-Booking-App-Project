let obj = { pname: 'Mobile', price: 10 };

let a = 20;
let b = 30;

function add(i, j) {
    return i + j;
}
export {obj, add };
//"export default" is allowed to use only one in one js file. 


// export default add;

// "export default" is genrally used where you want to export anonymous function and where you import it at the time of importing you can name it whatever you want.
// for Example:
// export default function () {
//     console.log('hi');
    
// }

// Variable ke lie "export default" karna hai to alag se code likhna hoga sirf as below:
export default a;

//Question
//What is the primary advantage of using a default export in JavaScript modules?
//The primary advantage of using a default export in JavaScript modules is that it allows you to export a single value, function, or object as the default export. When importing a default export, you can choose any name for the imported item, making the import statement shorter and more concise.