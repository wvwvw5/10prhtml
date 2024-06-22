class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    render(index) {
        return `
            <div class="card" id="car-${index}">
                <div class="card-body">
                    <h5 class="card-title">${this.make} ${this.model}</h5>
                    <p class="card-text">Year: ${this.year}</p>
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning" onclick="editCar(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteCar(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }
}

let cars = [];
const carList = document.getElementById('carList');
const carForm = document.getElementById('carForm');
let currentEditIndex = null;

carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;

    if (currentEditIndex === null) {
        const car = new Car(make, model, year);
        cars.push(car);
    } else {
        cars[currentEditIndex].make = make;
        cars[currentEditIndex].model = model;
        cars[currentEditIndex].year = year;
        currentEditIndex = null;
    }
    carForm.reset();
    displayCars();
});

function displayCars() {
    carList.innerHTML = '';
    cars.forEach((car, index) => {
        carList.innerHTML += car.render(index);
    });
}

function deleteCar(index) {
    cars.splice(index, 1);
    displayCars();
}

function editCar(index) {
    document.getElementById('make').value = cars[index].make;
    document.getElementById('model').value = cars[index].model;
    document.getElementById('year').value = cars[index].year;
    currentEditIndex = index;
}

displayCars();
