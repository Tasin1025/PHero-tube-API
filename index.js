let currentCategoryId = "1000";

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

const sortByView = async (categoryid) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryid}`);
    const data = await response.json();
    const videos = data.data;
    

    videos.sort((a, b) => {
        const first = parseInt(a.others.views.replace("k", ""));
        const second = parseInt(b.others.views.replace("k", ""));
        return second - first;
    });

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    if (data.status == false){
        const div = document.createElement("div");
        div.innerHTML = `
        <img class="mx-auto"  src="./Icon.png" alt="eroor">  
        <br>
        <h1 class="font-bold text-6xl"> OoPs ! There is no content </h1>
        `;
        div.classList.add("col-span-1", "md:col-span-2", "lg:col-span-4", "place-self-center")
        cardContainer.appendChild(div);
    }

    videos.forEach((video) => {
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
                        <p class="h-7 w-7"> ${
                            video.authors[0]?.verified ? `<img src="./verified.png">` : " "
                        } </p>
                    </div>
                    <p > ${video.others.views} Views </p>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
};

const loadVideo = async (categoryid) => {
    currentCategoryId = categoryid;

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryid}`);
    const data = await response.json();
    const videos = data.data;

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    
    if (data.status == false){
        const div = document.createElement("div");
        div.innerHTML = `
        <img class="mx-auto"  src="./Icon.png" alt="eroor">  
        <br>
        <h1 class="font-bold text-6xl"> OoPs ! There is no content </h1>
        `;
        div.classList.add("col-span-1", "md:col-span-2", "lg:col-span-4", "place-self-center")
        cardContainer.appendChild(div);
    }
    videos.forEach(video => {
         
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
                    <p class="h-7 w-7"> ${video.authors[0]?.verified ? `<img src="./verified.png">` : ' '}  </p>
                </div>
                <p > ${video.others.views} Views </p>
            </div>   
      </div>
        `;
        cardContainer.appendChild(div);
        // console.log(video.others.views.slice(0,3));
    })


    // console.log(data.data);
};

const sortButton = document.getElementById("sort-btn");
    sortButton.addEventListener("click", () => {
    
    sortByView(currentCategoryId);
    // console.log(currentCategoryId);
});

handleCategory();
loadVideo(currentCategoryId);
// sortByView("1000")
