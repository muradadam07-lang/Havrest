// سیستمێکی تەواوتری بەڕێوەبردنی ستاف
class StaffManager {
    constructor() {
        this.staffList = [];
        this.loadStaff();
    }
    
    // هێنانەوەی زانیاری ستاف لە localStorage
    loadStaff() {
        const savedStaff = localStorage.getItem('schoolStaff');
        if (savedStaff) {
            this.staffList = JSON.parse(savedStaff);
            this.renderStaff();
        }
    }
    
    // پاشەکەوتکردنی ستاف
    saveStaff() {
        localStorage.setItem('schoolStaff', JSON.stringify(this.staffList));
    }
    
    // زیادکردنی ستافی نوێ
    addStaff(staffData) {
        const newStaff = {
            id: Date.now(),
            ...staffData
        };
        
        this.staffList.push(newStaff);
        this.saveStaff();
        this.renderStaff();
        
        return newStaff;
    }
    
    // سڕینەوەی ستاف
    removeStaff(staffId) {
        this.staffList = this.staffList.filter(staff => staff.id !== staffId);
        this.saveStaff();
        this.renderStaff();
    }
    
    // نیشاندانی هەموو ستافەکان
    renderStaff() {
        const staffGrid = document.querySelector('.staff-grid');
        staffGrid.innerHTML = '';
        
        // ڕیزکردنی ستاف بەپێی کاتێگۆری
        const categories = {};
        
        this.staffList.forEach(staff => {
            if (!categories[staff.category]) {
                categories[staff.category] = [];
            }
            categories[staff.category].push(staff);
        });
        
        // دروستکردنی HTML بۆ هەر کاتێگۆریێک
        for (const [category, staffs] of Object.entries(categories)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'staff-category';
            
            let staffCardsHTML = '';
            staffs.forEach(staff => {
                staffCardsHTML += `
                    <div class="staff-card" data-staff-id="${staff.id}">
                        <div class="staff-avatar">${staff.avatar}</div>
                        <h4 class="staff-name">${staff.name}</h4>
                        <p class="staff-role">${staff.role}</p>
                        <p class="staff-bio">${staff.bio}</p>
                        <button class="remove-btn" onclick="staffManager.removeStaff(${staff.id})">سڕینەوە</button>
                    </div>
                `;
            });
            
            categoryDiv.innerHTML = `
                <h3 class="category-title">${category}</h3>
                ${staffCardsHTML}
            `;
            
            staffGrid.appendChild(categoryDiv);
        }
    }
}

// دروستکردنی بەڕێوەبەری ستاف
const staffManager = new StaffManager();

// فەنکشنی زیادکردنی ستافی نوێ بە فۆرم
function addStaffFromForm() {
    const name = document.getElementById('staffName').value;
    const role = document.getElementById('staffRole').value;
    const bio = document.getElementById('staffBio').value;
    const category = document.getElementById('staffCategory').value;
    const avatar = document.getElementById('staffAvatar').value || '👤';
    
    if (name && role && category) {
        const newStaff = staffManager.addStaff({
            name: name,
            role: role,
            bio: bio,
            category: category,
            avatar: avatar
        });
        
        // پاککردنەوەی فۆرم
        document.getElementById('addStaffForm').reset();
        alert('ستافی نوێ بە سەرکەوتوویی زیادکرا!');
    } else {
        alert('تکایە هەموو خانە پێویستەکان پڕ بکەرەوە');
    }
}
staffList.forEach(s => {
  const card = document.createElement('div');
  card.className = 'staff-category';
  card.innerHTML = `
    <h3 class="category-title">${s.category}</h3> <!-- ناوی category -->
    <div class="staff-card">
      <img src="${s.image}" alt="${s.name}" class="staff-avatar">
      <h4 class="staff-name">${s.name}</h4> <!-- ناوی مامۆستا -->
      <p class="staff-role">${s.role}</p> <!-- پۆست -->
      <p class="staff-bio">${s.bio}</p>
    </div>
  `;
  grid.appendChild(card);
});
// نیشاندانی ستافەکان لە کاتی بارکردن
// فەرمانێک بۆ زیادکردنی ستافی نوێ
function addNewStaffAutomatically() {
    const newStaff = [
        {
            id: Date.now() + 1,
            name: "هەڤرەست ئادەم",
            position: "بەڕێوەبەری کایپیکار",
            department: "تەکنیکی",
            degree: "بەکالۆریۆس",
            phone: "٠٧٥٠ ٦٦٦ ٧٧٧٧",
            email: "havrest@school.edu.krd",
            experience: "4",
            salary: "800000",
            info: "بەڕێوەبەری کایپیکار - شارەزا لە دروستکردنی وێبسایت و بەرنامەکان",
            status: "active"
        },
        {
            id: Date.now() + 2,
            name: "مەریوان مەغدێد",
            position: "فوق باحس",
            department: "ئیداری",
            degree: "ماستەر",
            phone: "٠٧٥٠ ٧٧٧ ٨٨٨٨",
            email: "mariwan.m@school.edu.krd",
            experience: "6",
            salary: "950000",
            info: "فوق باحس - شارەزا لە کاروباری قوتابخانە و بەڕێوەبردنی سیستەم",
            status: "active"
        },
        {
            id: Date.now() + 3,
            name: "یاریدەدەر عەبدوڵڵا",
            position: "یاریدەدەر",
            department: "ئیداری",
            degree: "بەکالۆریۆس",
            phone: "٠٧٥٠ ٨٨٨ ٩٩٩٩",
            email: "assistant@school.edu.krd",
            experience: "2",
            salary: "500000",
            info: "یاریدەدەر - پشتیوانی کاروباری ئیداری و ڕێکخستنی کۆبونەوەکان",
            status: "active"
        }
    ];

    // زیادکردنی ستافی نوێ
    staffData = [...staffData, ...newStaff];
    
    // نوێکردنەوەی نمایش
    renderStaff();
    
    showNotification('٣ ستافی نوێ بە سەرکەوتوویی زیادکران!');
}

// دوگمەیەک زیاد بکە بۆ زیادکردنی ئۆتۆماتیکی
// لە پانێڵی کاردا ئەم دوگمەیە زیاد بکە:
/*
<button class="btn" onclick="addNewStaffAutomatically()" style="background: #28a745;">
    <span>🚀</span>
    <span>زیادکردنی ئۆتۆماتیکی ستاف</span>
</button>
*/