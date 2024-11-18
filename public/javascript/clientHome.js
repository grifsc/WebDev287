//Fill Table
Services.forEach(service => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${service.service}</td>
        <td>${service.date}</td>
        <td>${service.time}</td>
        <td class="${
            service.status === 'Pending' ? 'warning' :
            service.status === 'Canceled' ? 'danger' :
            service.status === 'Completed' ? 'success' :
            'primary'
        }">${service.status}</td>
        <td class="primary">Details</td>
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});