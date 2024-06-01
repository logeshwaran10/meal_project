import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table } from 'antd';
import { debounce, forEach } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//Actions
import { getMealDetailSuccess, setUserDetails } from "../../redux/mealList/reducer";

//Component


//Firebase
import {
    getFirestore, collection, getDocs, doc, setDoc
} from 'firebase/firestore';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQmIGxMKvED4aT0TdIQzaoCkbP5PQnxD0",
    authDomain: "my-demo-1-67f0c.firebaseapp.com",
    projectId: "my-demo-1-67f0c",
    storageBucket: "my-demo-1-67f0c.appspot.com",
    messagingSenderId: "237426221453",
    appId: "1:237426221453:web:f8648f90cdb9c4e43f5dc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'order')
// get collection data

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const UsersTable = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let usersList = [];

        getDocs(colRef)
            .then(snapshot => {
                // console.log(snapshot.docs)
                snapshot.docs.forEach(doc => {
                    usersList.push({ ...doc.data(), key: doc.id })
                })
                console.log('usersList-1', usersList)
                setData(usersList);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);

    return (

        <Table dataSource={data} columns={columns} />

    );
};

export default UsersTable;
