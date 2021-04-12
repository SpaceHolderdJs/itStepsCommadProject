let savePostBtn = document.querySelector("#savePostBtn");
let successPopup = document.querySelector("#successPopup");

savePostBtn.addEventListener('click', function(){
    document.getElementById("successPopup").style.display = "block"
    setTimeout(() => {
        document.getElementById("successPopup").style.display = 'none'
    }, 2000);
})

