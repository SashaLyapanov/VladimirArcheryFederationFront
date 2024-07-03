import pdf from '../../img/pdf.png'

const DownloadPDFButton = ({pdfBytes, fileName}) => {

    const downloadPDF = () => {
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'file.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="file-block">
            <img src={pdf} onClick={downloadPDF} className="pdf-img" alt="PDF"/>
            <p>Название файла</p>
        </div>
    )
}

export default DownloadPDFButton;