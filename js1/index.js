for (let i = 1; i <= 10; i++) {
    document.write(
        `<table border=1 style="margin: 15px">
            <thead>
                <tr>
                    <th colspan=2>Produtos de ${i}</th>
                </tr>
            </thead>`
    );
  for (let j = 1; j <= 10; j++) {
    document.write(
        `<tbody>
            <tr style="text-align: center">
                <td>${i}x${j}</td>
                <td>${i * j}</td>
            </tr>
        </tbody>`
    );
  }
  document.write(
    `</table>`
    );
  
}

