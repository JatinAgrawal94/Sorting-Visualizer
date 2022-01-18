const newarray=document.getElementById('newarray');
const barAnimation=document.getElementById('bar-animation');
var array=[];
const sort=document.getElementsByClassName('sort');
const bubbleSort=document.getElementsByClassName('bubble')[0];
const selectionSort=document.getElementsByClassName('selection')[0];
const insertionSort=document.getElementsByClassName('insertion')[0];
const quickSort=document.getElementsByClassName('quick')[0];
const mergeSort=document.getElementsByClassName('merge')[0];
const stopButton=document.getElementsByClassName('stop')[0];
const noOfBars=document.getElementById('arr_sz');
const speedOfBars=document.getElementById('arr_sp');

const disableButton=(i)=>{
    for(let j=0;j<=4;j++){
        if(j==i){}
        else{
            sort[j].disabled=true;
        }
    }
}

const disableAll=()=>{
    for(let j=0;j<=4;j++){
        sort[j].disabled=true;
    }
}

const enableAll=()=>{
    for(let j=0;j<=4;j++){
        sort[j].disabled=false;
    }
}

disableAll();
stopButton.addEventListener('click',()=>{
    document.location.reload();
});

newarray.addEventListener('click',()=>{
    generateBars(noOfBars.value);
    addBars(array);
    newarray.disabled=true;
    noOfBars.disabled=true;
    speedOfBars.disabled=true;
    enableAll();
});

bubbleSort.addEventListener('click',()=>{
    disableAll();
    bubblesortAlgorithm(array);
})

selectionSort.addEventListener('click',()=>{
    disableAll();
    selectionSortAlgorithm(array);
})

insertionSort.addEventListener('click',()=>{
    disableAll();
    insertionSortAlgorithm(array);
})

quickSort.addEventListener('click',()=>{
    disableAll();
    quickSortAlgorithm(array,0,array.length-1);
})

mergeSort.addEventListener('click',()=>{
    disableAll();
    mergeSortAlgorithm(array,0,array.length-1);
})


const sortingFunction=(min,max)=>{
    return Math.floor(Math.random()*(max-min)+min);
}

const generateBars=(n)=>{
    var arr=[];
    for(let i=0;i<n;i++){
        arr.push(sortingFunction(0,100));
    }
    array=arr;
}

const addBars=(arr)=>{
    if(document.getElementsByClassName('bar')){
        removeAllChildNodes(barAnimation);
    }
    for(let i=0;i<arr.length;i++){
        const bar=document.createElement('div');
        let t=document.createTextNode(arr[i]*3);
        bar.style.height=`${arr[i]*3}px`;
        bar.className="bar";
        bar.style.width="20px";
        bar.style.backgroundColor="lightgreen"
        bar.style.borderRadius="3px";
        bar.appendChild(t);
        document.getElementById('bar-animation').appendChild(bar);        
    }
}

const removeAllChildNodes=(parent)=>{
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const swapBar=(a,b)=>{
    let el1=document.getElementsByClassName('bar');
    let temp=array[a];
    array[a]=array[b];
    array[b]=temp;

    const style1 = window.getComputedStyle(el1[a]);
    const style2 = window.getComputedStyle(el1[b]);

    const transform1 = style1.getPropertyValue("height");
    const transform2 = style2.getPropertyValue("height");
    el1[a].style.height = transform2;
    el1[b].style.height = transform1;
    let h1=transform2.replace('px','');
    let h2=transform1.replace('px','');
    el1[a].textContent=h1;
    el1[b].textContent=h2;
}

const assignBar=(a,b)=>{
    let el1=document.getElementsByClassName('bar');
    const style2 = window.getComputedStyle(el1[b]);
    const transform2 = style2.getPropertyValue("height");
    el1[a].style.height = transform2;
    let h1=transform2.replace('px','');
    el1[a].textContent=h1;   
}

const keyAssign=(a,b)=>{
    let el1=document.getElementsByClassName('bar');
    el1[a].style.height=`${b*3}px`;
    el1[a].textContent=`${b*3}`;
}

const bubblesortAlgorithm=async(arr)=>{
    let bar=document.getElementsByClassName('bar');
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                bar[j].style.backgroundColor="red";
                bar[j+1].style.backgroundColor="red";
                await new Promise(resolve=> setTimeout(()=>{resolve()},speedOfBars.value));
                swapBar(j,j+1);
                bar[j].style.backgroundColor="lightgreen";
                bar[j+1].style.backgroundColor="lightgreen";
            }
        }
    }
    newarray.disabled=false;
    noOfBars.disabled=false;
    speedOfBars.disabled=false;
}

const selectionSortAlgorithm=async(arr)=>{
    let bar=document.getElementsByClassName('bar');
    var i, j, min_idx;
    n=arr.length;
    for (i = 0; i < n-1; i++){
        min_idx = i;
        for (j = i + 1; j < n; j++){
        if (arr[j] < arr[min_idx])
            min_idx = j;
        
        bar[min_idx].style.backgroundColor="red";
        bar[j].style.backgroundColor="red";
        await new Promise(resolve=> setTimeout(()=>{resolve()},speedOfBars.value));
        swapBar(min_idx, i);
        bar[min_idx].style.backgroundColor="lightgreen";
        bar[j].style.backgroundColor="lightgreen";
        }
    }
    newarray.disabled=false;
    noOfBars.disabled=false;
    speedOfBars.disabled=false;
}

const insertionSortAlgorithm=async(arr)=>{
    var i, key, j; 
    let bar=document.getElementsByClassName('bar');
    for (i = 1; i < arr.length; i++){ 
        key = arr[i]; 
        j = i - 1; 
        while (j >= 0 && arr[j] > key)
        { 
            bar[j+1].style.backgroundColor="red";
            bar[j].style.backgroundColor="red";
            await new Promise(resolve=> setTimeout(()=>{resolve()},speedOfBars.value));
            arr[j + 1] = arr[j]; 
            assignBar(j+1,j);
            await new Promise(resolve=> setTimeout(()=>{resolve()},speedOfBars.value));
            bar[j].style.backgroundColor="lightgreen";
            bar[j+1].style.backgroundColor="lightgreen";
            j = j - 1; 
        } 
        await new Promise(resolve=> setTimeout(()=>{resolve()},speedOfBars.value));
        bar[j+1].style.backgroundColor="red";
        arr[j + 1] = key; 
        bar[j+1].style.backgroundColor="lightgreen";
        keyAssign(j+1,key);
    } 
    newarray.disabled=false;
    noOfBars.disabled=false;
    speedOfBars.disabled=false;
}

// features to be added
// stopping the ongoing function

const quickSortAlgorithm=async(arr,low,high)=>{
    
    if (low < high)
    {
        /* pi is partitioning index, arr[pi] is now
           at right place */
        pi =await  partition(arr, low, high);
        new Promise(resolve=>{
            setTimeout(()=>{
                resolve();
            },speedOfBars.value)
        })
        await quickSortAlgorithm(arr, low, pi - 1);  // Before pi
        await quickSortAlgorithm(arr, pi + 1, high); // After pi
    }
    newarray.disabled=false;
    noOfBars.disabled=false;
    speedOfBars.disabled=false;
}

async function partition(arr,low,high){
    // pivot (Element to be placed at right position)
    let bar=document.getElementsByClassName('bar');
    pivot = arr[high];  
    bar[high].style.backgroundColor="blue";

    i = (low - 1)  // Index of smaller element and indicates the 
                   // right position of pivot found so far

    for (j = low; j <= high- 1; j++)
    {
        // If current element is smaller than the pivot
        if (arr[j] < pivot)
        {
            i++;    // increment index of smaller element
            // let temp=arr[i];
            // arr[i]=arr[j];
            // arr[j]=temp;
            bar[i].style.backgroundColor="red";
            bar[j].style.backgroundColor="red";
            swapBar(i,j);
           await  new Promise(resolve=>{
                setTimeout(()=>{
                    resolve();
                },speedOfBars.value)
                
            });
            bar[i].style.backgroundColor="lightgreen";
            bar[j].style.backgroundColor="lightgreen";
            
        }
    }
    // let temp=arr[i+1];
    // arr[i+1]=arr[high];
    // arr[high]=temp;
    bar[i+1].style.backgroundColor="red";
    bar[high].style.backgroundColor="red";
    setTimeout(swapBar(i + 1,high),speedOfBars.value);
    // new Promise(resolve=> setTimeout(()=>{resolve()},speedOfBars.value));
    bar[i+1].style.backgroundColor="lightgreen";
    bar[high].style.backgroundColor="lightgreen";
    return (i + 1)
}


async function merge(arr, l, m, r){
    let bar=document.getElementsByClassName('bar');
    var n1 = m - l + 1;
    var n2 = r - m;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++){
        L[i] = arr[l + i];
        bar[l+i].style.backgroundColor="cyan";
    }
    await new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },speedOfBars.value);
    })
    for (var j = 0; j < n2; j++){
        R[j] = arr[m + 1 + j];
        bar[m+1+j].style.backgroundColor="blue";
    }
    await new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },speedOfBars.value);
    })
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = l;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            keyAssign(k,L[i]);
            bar[k].style.backgroundColor="lightgreen";
            await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve();
                },speedOfBars.value);
            })
            i++;
        }
        else {
            arr[k] = R[j];
            keyAssign(k,R[j]);
            bar[k].style.backgroundColor="lightgreen";
            await new Promise(resolve=>{
                setTimeout(()=>{
                    resolve();
                },speedOfBars.value);
            })
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        keyAssign(k,L[i]);
        bar[k].style.backgroundColor="lightgreen";
        await new Promise(resolve=>{
            setTimeout(()=>{
                resolve();
            },speedOfBars.value);
        })
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        keyAssign(k,R[j]);
        bar[k].style.backgroundColor="lightgreen";
        await new Promise(resolve=>{
            setTimeout(()=>{
                resolve();
            },speedOfBars.value);
        })
        j++;
        k++;
    }
}

async function mergeSortAlgorithm(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    await mergeSortAlgorithm(arr,l,m);
    await mergeSortAlgorithm(arr,m+1,r);
    await merge(arr,l,m,r);
    newarray.disabled=false;
    noOfBars.disabled=false;
    speedOfBars.disabled=false;
}