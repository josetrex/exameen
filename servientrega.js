const packages = [];

// Function to generate a unique tracking code
function generateTrackingCode(packageId, weight) {
    const weightInt = Math.floor(weight * 100); 
    const trackingCode = (packageId << 16) | weightInt; 
    return trackingCode.toString(16); // Convert to hexadecimal for readability
}


function updatePackageTable() {
    const tableBody = document.querySelector("#packageTable tbody");
    tableBody.innerHTML = "";

    // Populate the table with package data
    packages.forEach(pkg => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${pkg.recipientName}</td>
            <td>${pkg.packageId}</td>
            <td>${pkg.weight.toFixed(2)} kg</td>
            <td>${pkg.trackingCode}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Merge Sort Algorithm
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const sorted = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i].weight <= right[j].weight) {
            sorted.push(left[i]);
            i++;
        } else {
            sorted.push(right[j]);
            j++;
        }
    }

    return [...sorted, ...left.slice(i), ...right.slice(j)];
}

// Event listener for adding a package
document.getElementById("addPackageForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const recipientName = document.getElementById("recipientName").value.trim();
    const packageId = parseInt(document.getElementById("packageId").value.trim(), 10);
    const weight = parseFloat(document.getElementById("weight").value.trim());

    if (!recipientName) {
        alert("Error: Recipient name cannot be empty.");
        return;
    }
    if (isNaN(packageId) || packageId <= 0) {
        alert("Error: Invalid Package ID. Please enter a positive number.");
        return;
    }
    if (isNaN(weight) || weight <= 0) {
        alert("Error: Invalid Weight. Please enter a positive number.");
        return;
    }

    // Generate a unique tracking code
    const trackingCode = generateTrackingCode(packageId, weight);

    packages.push({ recipientName, packageId, weight, trackingCode });

    updatePackageTable();

    document.getElementById("addPackageForm").reset();
});

// Event listener for sorting packages by weight
document.getElementById("sortButton").addEventListener("click", function () {
    const sortedPackages = mergeSort(packages);
    packages.length = 0; 
    packages.push(...sortedPackages);

    updatePackageTable();
});