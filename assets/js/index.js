drug = document.getElementById("drug").value;
symptom = document.getElementById("symptom").value;

const postDiv3 = document.getElementById("thePosts");
const postDiv4 = document.getElementById("thePosts2");

async function load_response() {
  //open the request
  let response = await fetch(
    `https://www.ehealthme.com/api/v1/ds/${drug}/${symptom}`
  );
  if (response.ok) {
    let data = await response.json();

    return data;
  } else if (response.status === 404) {
    setTimeout(function () {
      window.location = "../error.html";
    }, 100);
  }
}

function load_response_data() {
  load_response()
    .then(function (posts) {
      //iterate over each post [30 posts]
      let output = "";
      for (const key in posts) {
        //output += `<img src="../assets/images/sideEffect.jpg" alt="" width="53%" style=" margin:4% 0 0 10%; border-radius:50%;"/>`;
        output += `<img src="../assets/images/links.png" alt="" width="53%" style="margin-left:13%;"/>`;
        if (Object.hasOwnProperty.call(posts, key)) {
          const element = posts[key];
          console.log(key);
          output += `<div>
          <h4 style="margin-left:30%;color:#7098da;padding:4%;">${key}</h4>
          </div>`;
          for (const i in element) {
            if (Object.hasOwnProperty.call(element, i)) {
              const res = element[i];
              output += `
              <div class="row" style="margin-left:10%;">
             
    <div class="col s12 m10">
      <div class="card" style="border-radius:3em; background-color: #7098da;">
        <div class="card-content white-text">
        <div class="icon"></div>
          <p style="padding-left:4em;font-size:16px;">&emsp; ${i} : <i style="color:#90f2ff">${res}</i></p>
        </div>
       
      </div>
    </div>
  </div>
              `;
            }
          }
          //console.log(element);
        }
      }

      postDiv3.innerHTML = output;
      // postDiv4.innerHTML = output2;
    })
    .catch(function (err) {
      //redirect1();
      console.log(err);
    });
}
