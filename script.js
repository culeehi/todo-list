const addButton = document.querySelector('#addBtn');
addButton.addEventListener('click', addStudent);

function emailIsValid(email) {
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function addStudent() {
   const fullName = document.querySelector('#fullname').value;
   const age = document.querySelector('#age').value;
   const score = document.querySelector('#score').value;
   const phone = document.querySelector('#phone').value;
   const email = document.querySelector('#email').value;

   // validate tên
   if (_.isEmpty(fullName)) {
      document.getElementById('fullname-error').innerHTML = 'không được để trống';
   } else if (fullName.trim().length < 2) {
      document.getElementById('fullname-error').innerHTML = 'Tên của bạn phải có nhiều hơn 2 kí tự';
   } else if (fullName.trim().length > 30) {
      document.getElementById('fullname-error').innerHTML = 'Tên của bạn tối đa có 30 kí tự';
   } else {
      document.getElementById('fullname-error').innerHTML = '';
   }

   // validate tuổi
   if (_.isEmpty(age)) {
      document.getElementById('age-error').innerHTML = 'không được để trống';
   } else if (age < 0) {
      document.getElementById('age-error').innerHTML = 'Tuổi của bạn phải lớn hơn 0';
   } else if (age > 100) {
      document.getElementById('age-error').innerHTML = 'Tuổi của bạn phải bé hơn 100';
   } else {
      document.getElementById('age-error').innerHTML = '';
   }

   // validate điểm
   if (_.isEmpty(score)) {
      document.getElementById('score-error').innerHTML = 'không được để trống';
   } else if (score < 0) {
      document.getElementById('score-error').innerHTML = 'Điểm của bạn phải lớn hơn 0';
   } else if (score > 10) {
      document.getElementById('score-error').innerHTML = 'Điểm của bạn phải bé hơn 10';
   } else {
      document.getElementById('score-error').innerHTML = '';
   }

   //validate sdt
   if (_.isEmpty(phone)) {
      document.getElementById('phone-error').innerHTML = 'không được để trống';
   } else if (phone.trim().length < 10 || phone.trim().length > 10) {
      document.getElementById('phone-error').innerHTML = 'Số điện thoại của bạn phải có 10 số';
   } else {
      document.getElementById('phone-error').innerHTML = '';
   }

   //validate email
   if (_.isEmpty(email)) {
      document.getElementById('email-error').innerHTML = 'không được để trống';
   } else if (!emailIsValid(email)) {
      document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
   } else {
      document.getElementById('email-error').innerHTML = '';
   }

   //thêm mới một sinh viên vào mảng
   const fullNameError = document.querySelector('#fullname-error').textContent;
   const ageError = document.querySelector('#age-error').textContent;
   const scoreError = document.querySelector('#score-error').textContent;
   const phoneError = document.querySelector('#phone-error').textContent;
   const emailError = document.querySelector('#email-error').textContent;

   // console.log(phoneError, 'phoneError');
   if (!fullNameError && !ageError && !scoreError && !emailError && !phoneError) {
      let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

      students.push({
         fullName: fullName,
         age: age,
         score: score,
         phone: phone,
         email: email,
      });
      localStorage.setItem('students', JSON.stringify(students));
      showListStudent();
      localStorage;
   }
}

function showListStudent() {
   let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
   // console.log(students);
   if (students.length === 0) {
      document.getElementById('list-student').style.display = 'none';
      return false;
   } else {
      document.getElementById('list-student').style.display = 'block';

      let tabContent = `
         <tr>
               <td>STT</td>
               <td>Tên</td>
               <td>Tuổi</td>
               <td>Điểm trung bình</td>
               <td>Số điện thoại</td>
               <td>Email</td>
               <td>Action</td>
         </tr>
         `;

      students.forEach((students, index) => {
         let studentId = index;
         index++;
         tabContent += `
         <tr>
            <td>${index}</td>
            <td>${students.fullName}</td>
            <td>${students.age}</td>
            <td>${students.score}</td>
            <td>${students.phone}</td>
            <td>${students.email}</td>
            <td>
            <a href='#'  onclick ="editStudent(${studentId})">Sửa</a> |
            <a href='#' onclick ="deleteStudent(${studentId})">Xóa</a>
            </td>
      </tr>
         `;
      });
      document.getElementById('view-table').innerHTML = tabContent;
   }
}

function deleteStudent(id) {
   let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
   students.splice(id, 1);
   localStorage.setItem('students', JSON.stringify(students));
   showListStudent();
}

function editStudent() {
   let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
}

function searchUser() {
   let valueSearchInput = document.querySelector('#search').value;
   let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
   let userSearch = students.filter((value) => {
      return (
         value.fullName.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
         value.phone.toUpperCase().includes(valueSearchInput.toUpperCase()) ||
         value.email.toUpperCase().includes(valueSearchInput.toUpperCase())
      );
   });
   console.log(userSearch);
   localStorage.setItem('students', JSON.stringify(students));

   let tabContent = `
   <tr>
         <td>STT</td>
         <td>Tên</td>
         <td>Tuổi</td>
         <td>Điểm trung bình</td>
         <td>Số điện thoại</td>
         <td>Email</td>
         <td>Action</td>
   </tr>
   `;

   userSearch.forEach((students, index) => {
      let studentId = index;
      index++;
      tabContent += `
   <tr>
      <td>${index}</td>
      <td>${students.fullName}</td>
      <td>${students.age}</td>
      <td>${students.score}</td>
      <td>${students.phone}</td>
      <td>${students.email}</td>
      <td>
      <a href='#'>Sửa</a> |
      <a href='#' onclick ="deleteStudent(${studentId})">Xóa</a>
      </td>
</tr>
   `;
   });
   document.getElementById('view-table').innerHTML = tabContent;
}
