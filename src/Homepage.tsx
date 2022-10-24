import React, { useEffect, useState } from 'react'
import { DropdownMenu, Navbar, NavItem } from './Navcomponents.tsx';
import './Homepage.css';
import Axios from 'axios'
import ReactStars from 'react-rating-stars-component';
import Accordion from 'react-bootstrap/Accordion';
import TheCard from './Accordian.tsx';
import Modal from 'react-bootstrap/Modal';


function Homepage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [reviewList, setReviewList] = useState<any[]>([])

  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState<number>(0);
  const [toilet, setToilet] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [reviewing, setReviewing] = useState("");
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const [display, setDisplay] = useState(false);
  const [buttonText, setButtonText] = useState("Show Review!");

  const [theCard0, setTheCard0] = useState(true);
  const [theCard1, setTheCard1] = useState(true);
  const [theCard2, setTheCard2] = useState(true);
  const [theCard3, setTheCard3] = useState(true);
  const [theCard4, setTheCard4] = useState(true);
  const [theCard5, setTheCard5] = useState(true);
  const [theCard6, setTheCard6] = useState(true);
  const [theCard7, setTheCard7] = useState(true);

  const allToFalse = () => {
    setTheCard0(false);
    setTheCard1(false);
    setTheCard2(false);
    setTheCard3(false);
    setTheCard4(false);
    setTheCard5(false);
    setTheCard6(false);
    setTheCard7(false);
  }
  // function calval(val){
  //   return
  // }

  const getReview = () => {
    Axios.get('http://localhost:3001/review').then((response) => {
      setReviewList(response.data);
    });
  }

  const addReview = (event) => {
    event.preventDefault()
    Axios.post('http://localhost:3001/create', {
      building: building,
      floor: floor,
      toilet: toilet,
      rating: rating,
      name: name,
      reviewing: reviewing
    }).then(() => {
      setReviewList([
        ...reviewList, {
          building: building,
          floor: floor,
          toilet: toilet,
          rating: rating,
          name: name,
          reviewing: reviewing
        }
      ])
    })
  }

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setReviewList(
        reviewList.filter((val) => {
          return val.id !== id;
        })
      )
    })
  }

  const customStyles = {
    content: {
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '60%',
      transform: 'translate(-50%, -10%)',
    },
    overlay: {
      background: "rgba(0,0,0,0.5)",
      transparent: "1"
    },
  };



  useEffect(() => {
    getReview();
  }, [])

  const [conMap, setConMap] = useState();

  const mapping = reviewList.map((val, key) => {
    if (val.id == null) { return null } else /*if (val.building == conMap)*/ {
      return (
        <div className='review card'>
          <div className='card-body text-left'>
            <p className='card-text'>Building: {val.building}</p>
            <p className='card-text'>Floor: {val.floor}</p>
            <p className='card-text'>Toilet: {val.toilet}</p>
            <p className='card-text'>Rating: {val.rating}</p>
            <p className='card-text'>Name: {val.name}</p>
            <p className='card-text'>Comment: {val.reviewing}</p>
            <div className='d-flex'>
              <button className='btn btn-warning' onClick={() => { deleteReview(val.id) }}>Delete</button>
            </div>
            {/* <p className='card-text'>{val.id}</p> */}
          </div>
        </div>
      )
    }
  })



  // var domapping;
  // if(display){
  //   domapping = mapping;
  // }else{ domapping = <div></div>}

  const showDisplay = () => {
    getReview();
    if (display)
      setButtonText("Show Review!");
    else setButtonText("Close Review!");
    setDisplay(current => !current);
  }

  const showDisplayCon = (e) => {
    getReview();
    if (display)
      setButtonText("Show Review!");
    else setButtonText("Close Review!");
    setConMap(e);
    setDisplay(current => !current);
  }

  const [countStar, setCountStar] = useState()
  const calval = (e) => {
    reviewList.map((val, key) => {
      if (val.building == e) {

      }
    })
  }

  return (
    <div>
      <Navbar>
        <NavItem icon="O">
          <DropdownMenu
            navAllToFalse={allToFalse}
          />
        </NavItem>
      </Navbar>

      <button className="btn btn-success" type="button" onClick={handleShow}>+  Add your review!
      </button>
      <Modal show={show} onHide={handleClose} centered>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="building" className="form-label">Building: </label>
              <select onChange={(event) => { setBuilding(event.target.value) }}>
                <option value="">Select</option>
                <option value="Building Arun">ตึกอรุณ</option>
                <option value="Building 1">ตึก 1</option>
                <option value="Building 2">ตึก 2</option>
                <option value="Building 3_1">ตึก 3 บันไดกลาง</option>
                <option value="Building 3_2">ตึก 3 ฝั่งสวน</option>
                <option value="Building 4">ตึก 4</option>
                <option value="Building Yo">ตึกโยธา</option>
                <option value="Building 100">ตึก 100 ปี</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="floor" className="form-label">Floor: </label>
              <select onChange={(event) => { setFloor(event.target.value) }}>
                <option value={0}>Select</option>
                <option value={1}>ชั้น 1</option>
                <option value={2}>ชั้น 2</option>
                <option value={3}>ชั้น 3</option>
                <option value={4}>ชั้น M</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="toilet" className="form-label">Tolet: </label>
              <select onChange={(event) => { setToilet(event.target.value) }}>
                <option value="">Select</option>
                <option value="Men">ห้องน้ำชาย</option>
                <option value="Women">ห้องน้ำหญิง</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating: </label>
              {/* <select onChange={(event) => { setRating(event.target.value) }}>
                <option value={-1}>Select</option>   
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select> */}
              <ReactStars size={30} count={5} half={false} onChange={ratingChanged} />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name: </label>
              <input type="text" className="form-control" placeholder='Enter name' onChange={(event) => { setName(event.target.value) }} />
            </div>
            <div className="mb-3">
              <label htmlFor="reviewing" className="form-label">Comment: </label>
              <input type="text" className="form-control" placeholder='Enter review' onChange={(event) => { setReviewing(event.target.value) }} />
            </div>
            <button className="btn btn-success" onClick={(event) => { addReview(event); handleClose(); }}> Submit </button>
          </form>
        </div>
      </Modal>

      

      {/* <div>
        <>{display && <Modal show={show} onHide={handleClose}> {mapping}</Modal>}</>
      </div> */}
      <Modal show={show} onHide={handleClose} scrollable={true} > <Modal.Body>{mapping} </Modal.Body></Modal>
      <button className="btn btn-primary" type="button" onClick={handleShow}>{buttonText}</button>

      <TheCard />
    </div>
  )
}

export default Homepage
