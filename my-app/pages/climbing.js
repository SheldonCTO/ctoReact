import { useEffect, useState } from 'react';
import Modal from '../components/modal';
//import RecordBox from '@/components/recordBox';
import { readToken } from "@/lib/authenticate";
import Link from 'next/link';

export default function Records() {
    const [records, setRecords] = useState([]);
    const [selectedRecords, setSelectedRecord] = useState(null);
    let token = readToken();

    useEffect(() => {
        // Fetch products from the API
        fetch('https://localhost.8080')
            .then((res) => res.json())
            .then(setRecords)
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Function to handle clicking on a product row
    const handleRowClick = (record) => {
        setSelectedRecord(record);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedRecord(null);
    };

    useEffect(() => {
        const token = readToken();
        const isLoginModalDisplayed = sessionStorage.getItem('loginModalDisplayed');
        if (token && !isLoginModalDisplayed) {
            setShowLoginSuccessModal(true);
            sessionStorage.setItem('loginModalDisplayed', true);
            setLoginModalDisplayed(true); // Set loginModalDisplayed to true once the login success modal is displayed
        }
    }, []);

    const handleLoginClose = () => {
        setShowLoginSuccessModal(false);
    };

    return (
<div>
  <div className="card">
    {records.map((record) => (
      <div key={record.id} onClick={() => handleRowClick(record)}>
        <p style={{ width: "200px" }}>{record.title}</p>
        <p style={{ width: "70px" }}>{record.location}</p>
        <p style={{ width: "70px" }}>{record.grade}</p>
        
        <div className="video-container">
          <iframe
            src={record.URL}
            title={record.title}
            style={{ border: "0" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ))}
  </div>

  {/* {selectedRecords && (
    <Modal onClose={handleCloseModal}>
      <RecordBox record={selectedRecords} />
    </Modal>
  )} */}
  
  {token && <Link href="./newRecord" passHref legacyBehavior>New Record</Link>}
</div>

    );
}
