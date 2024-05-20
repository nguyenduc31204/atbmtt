const chuyen = document.querySelector(".chuyen");
const taokhoa = document.querySelector("#taokhoa");
const ky = document.querySelector("#btnky");
const ktra = document.querySelector("#btnktra");
const fileInput = document.getElementById('file1');
const textArea = document.getElementById('inputky');
const fileInput2 = document.getElementById('file2');
const textArea2 = document.getElementById('inputktra');
const fileInput3 = document.getElementById('fileck');
const textArea3 = document.getElementById('vanbanky');
const textArea4 = document.getElementById('vanbanktra');
const downloadButton = document.querySelector('.download');

//download
downloadButton.addEventListener('click', () => {
    const content = textArea3.innerHTML;
    const fileName = 'chuKy.txt'; 
    const file = new File([content], fileName, {
      type: content.type
    });
  
    saveAs(file);
  });


  
fileInput.addEventListener('change', (event) => {
    const reader = new FileReader();
  
    reader.onload = (e) => {
      textArea.value = e.target.result;
    };
  
    reader.readAsText(event.target.files[0]);
  });
  
  
  
  fileInput2.addEventListener('change', (event) => {
    const reader = new FileReader();
  
    reader.onload = (e) => {
      textArea2.value = e.target.result;
    };
  
    reader.readAsText(event.target.files[0]);
  });
  
  fileInput3.addEventListener('change', (event) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        textArea4.innerHTML = e.target.result;
      };
      reader.readAsText(event.target.files[0]);
    });
  
  ky.addEventListener('click', function () { 
      var x = document.querySelector("#inputky").value; 
      tinhXicma(x);
  });

//KIỂM TRA PRIME
function checkPri(num){
    if(num < 2) return false;
    for(let i = 2; i <= Math.sqrt(num); i++){
        if(num % i == 0){
            return false;
        }
    }
    return true;
};

chuyen.addEventListener('click', function () {  
    document.querySelector("#vanbanktra").innerHTML = document.querySelector("#xicma").value;
    document.querySelector("#inputktra").value = document.querySelector("#inputky").value;
});


//KIỂM TRA GCD
function gCD(p, k) {  
    let du = 1;
    while(du != 0){
        du = p % k;
        p = k;
        k = du;
    }
    return p;
};

// RANDOM KHÓA K
taokhoa.addEventListener("click", function(){
    let alpha = Math.floor(Math.random() * 1000000);
    document.querySelector("#anpha").value = alpha;
    var sp = Math.floor(Math.random() * 1000000);
    var sk = Math.floor(Math.random() * 1000000);
    while(!checkPri(sp)){
        sp = Math.floor(Math.random() * 1000000);
    }
    document.querySelector("#p").value = sp;
    while(gCD(sk, (sp - 1)) != 1){
        sk = Math.floor(Math.random() * sp) - 2;
    }
    var sa = Math.floor(Math.random() * sp) - 2;
    document.querySelector("#a").value = sa;
    document.querySelector("#k").value = sk;
    var result = binhPhuongVoiNhan(sa, alpha, sp);
    document.getElementById('beta').value = result;
});


function binhPhuongVoiNhan(num, x, y) {
    const tinh = num.toString(2);
    let p = 1;
    for(let i = 0; i < tinh.length; i++){
        p = (p * p) % y;
        if(tinh[i] == 1){
            p = p * x;
            p = p % y;
        }
    }
    return p;
};

//OCLIT
function oClit (k, p) {
    let ri = p;
    let rin = k;
    let tst = 0, ts = 1;
    let tin;
    let tmp;
    let gtmp;
    while(rin > 1){
        tin = tst - ts*Math.floor(ri / rin);
        tmp = rin;
        rin = ri - rin*Math.floor(ri / rin);
        ri = tmp;
        gtmp = ts;
        ts = tin;
        tst = gtmp;
    }
    if(tin < 0){
        tin = tin + p;
    }
    return tin;
};

// console.log(oClit(17, 23));



//TÍNH XICMA

function tinhXicma(x){

    const soAlpha = parseInt(document.querySelector("#anpha").value);
    const soA = parseInt(document.querySelector("#a").value);
    const soK = parseInt(document.querySelector("#k").value);
    const soP = parseInt(document.querySelector("#p").value);   

    const res = oClit(soK, (soP - 1)); 
    const gama = binhPhuongVoiNhan(soK, soAlpha, soP);

    document.querySelector("#gama").value = gama;
    var cky = [];
    const hash = CryptoJS.MD5(x).toString(CryptoJS.enc.Hex);
    var hash1 = [];
    let n = 0;
    for(let i = 0; i < 4; i++){
        hash1.push(hash.slice(n, n + 8));
        n += 8;
    }
    for(let i = 0; i< 4; i++){
        console.log(parseInt(hash1[i], 16));
    }
    for(let i = 0; i < hash1.length; i++){
        let res2 = (parseInt(hash1[i], 16) - soA * gama) % (soP - 1);
        let result = ((res2*res) % (soP - 1));
        if(result < 0){
            result = result + (soP - 1);
        };
        cky.push(result); 
    }

    var t = cky.map( item =>item.toString()).join(', ');
    document.querySelector("#xicma").value = t;
    console.log(t);
    document.querySelector("#vanbanky").innerHTML = t;
};



ktra.addEventListener('click', function () {  
    var x = document.querySelector("#inputktra").value; 
    ktrak(x);
});



function ktrak(x) {
    const soAlpha = parseInt(document.querySelector("#anpha").value);
    const soA = parseInt(document.querySelector("#a").value);
    const soP = parseInt(document.querySelector("#p").value);

    const beta = binhPhuongVoiNhan(soA, soAlpha, soP);
    const gama = parseInt(document.querySelector("#gama").value);
    const xicma = document.querySelector("#vanbanktra").innerHTML;
    var xicm = [];
    xicm = xicma.split(", ");
    var end1= [];
    var end2= [];
    const hash = CryptoJS.MD5(x).toString(CryptoJS.enc.Hex);
    var hash1 = [];
    let n = 0;
    for(let i = 0; i < 4; i++){
        hash1.push(hash.slice(n, n + 8));
        n += 8;
    }

    for(let i = 0; i < hash1.length; i++){
        var and1 = binhPhuongVoiNhan(gama, beta, soP);
        var and2 = binhPhuongVoiNhan(parseInt(xicm[i]), gama, soP);
        let v1 = (and1 * and2) % soP;
        end1.push(v1);
        let v2 = binhPhuongVoiNhan(parseInt(hash1[i], 16), soAlpha , soP);
        end2.push(v2);
    };

    let check = true;
    for(let i = 0; i < 4; i++){
        if(end1[i] != end2[i]){
            check = false;
        }
    }
    if(check){
        document.querySelector("#thongbao").innerHTML = "Văn bản chưa bị sửa đổi."
    }
    else{
        document.querySelector("#thongbao").innerHTML = "Văn bản đã bị sửa đổi."
    }
};
