
// Find the container div by its class name
var arrayContainer = document.getElementById("arrayContainer")
let Arr = [];
let size = 100;
populateArray(Arr, size);
drawArray(Arr, -1, -1);



// Generate New Array 
    document.getElementById("NewArray").addEventListener("click", function() {
        
        // clear the array
        Arr.length = 0;

        populateArray(Arr, size);
        drawArray(Arr, -1, -1);
        
    });


    function drawArray(Array, index1, index2) {


        // clear the container div
        arrayContainer.innerHTML = "";
        
        // create a new div for every element in the array
        for (let i = 0; i < Arr.length; i++) {
            var newDiv = document.createElement("div");

        // Set properties for the new div
        newDiv.id = "array-bar" + i;
        newDiv.className = "array-bar";
        newDiv.style.height = Arr[i] * size/20 + "px";

        // Color the divs that are being compared
        if (i == index1 || i == index2)
            {newDiv.style.backgroundColor = "red";}
        


        // Append the new div inside the container div
        arrayContainer.appendChild(newDiv);
    }}


// Populate Array 

function populateArray(array, size) {

    let uniqueValues = new Set(); // To keep track of unique values

    while (uniqueValues.size < size) {
        let newValue = Math.floor(Math.random() * size) + 1;
        if (!uniqueValues.has(newValue)) {
            uniqueValues.add(newValue);
            array.push(newValue);
        }
    }
}





/* -- Sorting Algorithms -- */
    
// bubble Sort
function bubbleSort(Array) {
    let swapped;
    let delay = 10; 

    async function delayAndDraw(index1, index2) {
        await new Promise(resolve => setTimeout(resolve, delay));
        drawArray(Array, index1, index2);
    }

    async function innerBubbleSort() {
        do {
            swapped = false;
            for (let i = 0; i < Array.length; i++) {
                if (Array[i] > Array[i + 1]) {
                    swap(Array, i, i + 1);
                    swapped = true;
                    await delayAndDraw(i, i+1);
                }
            }
        } while (swapped);
        drawArray(Arr, -1, -1);
    }

    innerBubbleSort(); // Start the sorting process
    }

    document.getElementById("bubbleSort").addEventListener("click", function() {
        bubbleSort(Arr);
    });





    // Merge Sort
    function MergeSort(Array) {
        let delay = 10; 

        async function delayAndDraw(index1, index2) {
            await new Promise(resolve => setTimeout(resolve, delay));
            drawArray(Array, index1, index2);
        }

        async function mergeSort(Array, start, end) {
            if (start < end) {
                let mid = Math.floor((start + end) / 2);
                await mergeSort(Array, start, mid);
                await mergeSort(Array, mid + 1, end);
                await merge(Array, start, mid, end);
            }
        }

        async function merge(Array, start, mid, end) {
            let tempArray = [];
            let first = start;
            let second = mid + 1;

            while (first <= mid && second <= end) {
                if (Array[first] < Array[second]) {
                    tempArray.push(Array[first]);
                    first++;
                } else {
                    tempArray.push(Array[second]);
                    second++;
                }
            }

            while (first <= mid) {
                tempArray.push(Array[first]);
                first++;
            }

            while (second <= end) {
                tempArray.push(Array[second]);
                second++;
            }

            for (let i = start; i <= end; i++) {
                Array[i] = tempArray[i - start];
                await delayAndDraw(i, i);
            }
        }

        mergeSort(Array, 0, Array.length - 1);
        drawArray(Arr, -1, -1);
    }

    document.getElementById("mergeSort").addEventListener("click", function() {
        MergeSort(Arr);
    });



    // Quick Sort
    function QuickSort(Array) {
        let delay = 10; 

        async function delayAndDraw(index1, index2) {
            await new Promise(resolve => setTimeout(resolve, delay));
            drawArray(Array, index1, index2);
        }

        async function quickSort(Array, start, end) {
            if (start < end) {
                let pivot = await partition(Array, start, end);
                await quickSort(Array, start, pivot - 1);
                await quickSort(Array, pivot + 1, end);
            }
        }

        async function partition(Array, start, end) {
            let pivot = Array[end];
            let i = start - 1;
            for (let j = start; j < end; j++) {
                if (Array[j] < pivot) {
                    i++;
                    swap(Array, i, j);
                    await delayAndDraw(i, j);
                }
            }
            swap(Array, i + 1, end);
            await delayAndDraw(i + 1, end);
            return i + 1;
        }

        quickSort(Array, 0, Array.length - 1);
        drawArray(Arr, -1, -1);
    }

    document.getElementById("quickSort").addEventListener("click", function() {
        QuickSort(Arr);
    });


    // insertion Sort
    function insertionSort(Array) {
        let delay = 10; 

        async function delayAndDraw(index1, index2) {
            await new Promise(resolve => setTimeout(resolve, delay));
            drawArray(Array, index1, index2);
        }

        async function insertionSort(Array) {
            for (let i = 1; i < Array.length; i++) {
                let j = i - 1;
                let temp = Array[i];
                while (j >= 0 && Array[j] > temp) {
                    Array[j + 1] = Array[j];
                    j--;
                    await delayAndDraw(j + 1, j);
                }
                Array[j + 1] = temp;
                await delayAndDraw(j + 1, j + 1);
            }
        }

        insertionSort(Array);
        drawArray(Arr, -1, -1);
    }

    document.getElementById("insertionSort").addEventListener("click", function() {
        insertionSort(Arr);
    });

    // selection Sort
    function selectionSort(Array) {
        let delay = 10; 

        async function delayAndDraw(index1, index2) {
            await new Promise(resolve => setTimeout(resolve, delay));
            drawArray(Array, index1, index2);
        }

        async function selectionSort(Array) {
            for (let i = 0; i < Array.length; i++) {
                let minIndex = i;
                for (let j = i + 1; j < Array.length; j++) {
                    if (Array[j] < Array[minIndex]) {
                        minIndex = j;
                    }
                }
                swap(Array, i, minIndex);
                await delayAndDraw(i, minIndex);
            }
        }

        selectionSort(Array);
        drawArray(Arr, -1, -1);
    }

    document.getElementById("selectionSort").addEventListener("click", function() {
        selectionSort(Arr);
    });




    // helper functions
    function swap(Array, firstIndex, secondIndex) {
        let temp = Array[firstIndex];
        Array[firstIndex] = Array[secondIndex];
        Array[secondIndex] = temp;
    }


    