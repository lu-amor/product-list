import React, { useState } from 'react';
import classes from './Modal.module.css';

const Modal = ({ closeModal, addProduct }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [cantidad, setQuantity] = useState('');
    const [emoji, setEmoji] = useState('');
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        category: '',
        cantidad: '',
        comprado: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct({ title, description, category, cantidad, comprado: false });
        setNewProduct({ title: "", description: "", category: '', cantidad: '', comprado: false });
        closeModal();
    };

    return (
        <div className={`modal is-active ${classes.overlay}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className={`modal-content`}>
                <div className={`box ${classes['crear-editar']}`}>
                    <p className="subtitle is-4">New Product</p>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input id="product-title" className="input" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea id="product-description" className="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="control">
                                    <select id="product-category" className="select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                        <option value="" disabled>Category</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Dairy">Dairy</option>
                                        <option value="Grains">Grains</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Quantity</label>
                                <div className="control">
                                    <input id="product-cantidad" className="number" placeholder="Quantity" value={cantidad} onChange={(e) => setQuantity(e.target.value)} required type="number"/>
                                </div>
                            </div>
                        </div>
                        <div className={`field is-grouped ${classes.buttons}`}>
                            <div className="control">
                                <button type="button" className={`button is-danger ${classes['boton-aceptar-cancelar']}`} onClick={closeModal}>Cancel</button>
                            </div>
                            <div className="control">
                                <button type="submit" className={`button is-success ${classes['boton-aceptar-cancelar']}`}>Accept</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;