const log = console.log;

window.addEventListener("load", () => {
    let a = [1, 2, 3];
    
    delete a[0];

    log(a)
    log(typeof a[0]);
})