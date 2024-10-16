export const successNofity = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // progress: ,
        theme: "dark",
        transition: Flip,
    });
}

export const errorNofity = (msg) => {
    toast.error(msg, {
        
    })
}