const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
 
    const tabContainer = document.getElementById("tabContainer");

    data.data.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="loadVideo('${category.category_id}')" class="tabs tabs-boxed m-3 p-3 text-xl font-normal"> ${category.category} </a> 
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
      //  console.log(video.authors[0]);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-96 bg-base-100 m-5">
            <figure class="px-5 pt-5">
            <img src="${video.thumbnail}" alt="Shoes" class="rounded-xl w-[320px] h-[200px]" />
            </figure>
            <div class="card-body  text-center">
                <div class="flex gap-5 justify-left ">
                    <img src="${video.authors[0].profile_picture}" alt="" class="rounded-full h-10 w-10" />
                    <h2 class="card-title font-bold "> ${video.title}</h2>
                </div>
            
            </div>
            <div class="text-left ml-24 -mt-8">
                <div class="flex gap-2 justify-left items-center">
                    <p> ${video.authors[0].profile_name} </p>
                    <p class="h-7 w-7"> ${video.authors[0]?.verified? `<img src="./verified.png">` : ' '}  </p>
                </div>
                <p > ${video.others.views} Views </p>
            </div>   
      </div>
        `;
        cardContainer.appendChild(div);
    } )



    console.log(data.data);
};

handleCategory();
loadVideo("1000");