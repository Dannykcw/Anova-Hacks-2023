/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
});
//fetch
    let url = 'https://newsapi.org/v2/everything?' +
      'q=climate change AND (ice cap OR rising sea)&' +
      'sortBy=popularity&' +
      'apiKey=52df626e1b3e4a7d92f6d34b69a28627' ;

    let req = new Request(url);

fetch(req)
        .then(function(response) {
         var resData = response.json();
         resData.then(function(result){
         resData=result["articles"]; 
         //console.log(resData);
         var containerEle = document.querySelector('#news-container');
         renderNewsList(resData, containerEle);
        });
    })
       // .catch((error) => {
        //    return console.error("FETCH ERROR:", error);
        //}); 
    //updates news to column
function renderNewsList(data, container) {
    console.log(data);
    // create a column element
    const column = document.createElement('div');
    column.className = 'col';
    //data=data[PromiseResult];
    console.log(Object.keys(data));
  
    // iterate over the data and create rows for each item
    data.forEach(item => {
      // create a row for the image
      const imgRow = document.createElement('div');
      imgRow.className = 'row-4';

      const img = document.createElement('img');
      img.src = item.urlToImage;
      imgRow.appendChild(img);
  
      // create a row for the content
      const contentRow = document.createElement('div');
      contentRow.className = 'row-8';

      const date = document.createElement('p');
      date.className = 'lead';
      date.textContent = item.publishedAt;

      const title = document.createElement('a');
      title.href = item.url;
      title.style.fontWeight = "bold";
      title.innerHTML = item.title;
      const description = document.createElement('p');
      description.innerHTML = item.description;
      contentRow.appendChild(date);
      contentRow.appendChild(title);
      contentRow.appendChild(description);
  
      // append the rows to the column
      column.appendChild(imgRow);
      column.appendChild(contentRow);
    });
  
    // append the column to the container
    container.appendChild(column);
}