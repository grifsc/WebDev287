Clients.forEach(clients => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${clients.clientName}</td>
        <td>${clients.service}</td>
        <td>${clients.date}</td>
        <td>${clients.time}</td>
        <td class="${
            clients.status === 'Pending' ? 'warning' :
            clients.status === 'Delayed' ? 'danger' :
            clients.status === 'Complete' ? 'success' :
            'primary'
        }">${clients.status}</td>
        <td class="${
            clients.paid === 'Unserviced' ? 'warning' :
            clients.paid === 'Unpaid' ? 'danger' :
            clients.paid === 'Paid' ? 'success' :
            'secondary'
        }">${clients.paid}</td>
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});