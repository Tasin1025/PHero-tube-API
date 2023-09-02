const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
 
    const tabContainer = document.getElementById("tabContainer");

    data.data.forEach(category => {
        console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="loadVideo('${category.category_id}')" class="tab"> ${category.category} </a> 
        `;
        tabContainer.appendChild(div);
    });


    

};
const loadVideo = async (categoryid) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryid}`);
    const data = await response.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    data.data.forEach(video => {
        console.log(video.authors[0]);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-96 bg-base-100 m-5">
        <figure class="px-10 pt-10">
          <img src="${video.thumbnail}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body  text-center">
            <div class="flex gap-5 justify-between ">
                <img src="${video.authors[0].profile_picture}" alt="" class="rounded-full h-10 w-10" />
                <h2 class="card-title "> ${video.title}</h2>
            </div>
          
        </div>
        <div class="text-left ml-10">
            <p> ${video.authors[0].profile_name} </p>
            <p> ${video.authors[0]?.verified} </p>
            
            <p > ${video.others.views} </p>
        </div>   
      </div>
        `;
        cardContainer.appendChild(div);
    } )



    console.log(data.data);
};

handleCategory();
loadVideo("1000");