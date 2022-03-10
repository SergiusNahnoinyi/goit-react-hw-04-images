import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './App.css';

export default class App extends Component {
  state = {
    imageName: '',
    showModal: false,
    stateURL: '',
  };

  handleFormSubmit = query => {
    this.setState({ imageName: query });
  };

  toggleModal = url => {
    this.setState(({ showModal }) => ({
      stateURL: url,
      showModal: !showModal,
    }));
  };

  render() {
    const { imageName, showModal, stateURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={imageName} handleModal={this.toggleModal} />
        {showModal && <Modal onClose={this.toggleModal} imageURL={stateURL} />}
        <ToastContainer />
      </div>
    );
  }
}
