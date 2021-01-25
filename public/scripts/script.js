window.onload = ()=>{

  let coll = document.getElementsByClassName("collapsible");
  let content = document.getElementsByClassName("content")[0];
  content.style.display = 'none'

  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      console.log( 'clicked', content )
      // this.classList.toggle("active");
      if (content.style.display === "block") {
        content.style.display= "none"
      } else {
        content.style.display= "block"
      }
    });
  }
}

