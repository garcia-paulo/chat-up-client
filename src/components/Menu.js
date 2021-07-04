import React from 'react'
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { Button, Modal, Nav, Tab } from 'react-bootstrap';
import ConversationsTab from './ConversationsTab';
import ContactsTab from './ContactsTab';
import User from './User'
import ProfileModal from './modals/ProfileModal'
import { useAuth } from './contexts/AuthContext';

export default function Menu() {
	const [activeKey, setActiveKey] = useState("conversations");
	const [hover, setHover] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const { isAuthenticated, signOut } = useAuth();

	const openModal = () => {
		setModalOpen(true);
	}

	const closeModal = () => {
		setModalOpen(false);
	}

	if (redirect || !isAuthenticated()) {
		return <Redirect to={"/"}></Redirect>
	}

	return (
		<div style={{ width: "250px" }} className="border d-flex flex-column">
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant="tabs" className="justify-content-center">
					<Nav.Link eventKey="conversations"><i className="fa fa-comments-o"></i> Conversas</Nav.Link>
					<Nav.Link eventKey="contacts"><i className="fa fa-address-book-o"></i> Contatos</Nav.Link>
				</Nav>
				<Tab.Content className="overflow-auto flex-grow-1">
					<Tab.Pane eventKey="conversations">
						<ConversationsTab />
					</Tab.Pane>
					<Tab.Pane eventKey="contacts">
						<ContactsTab />
					</Tab.Pane>
				</Tab.Content>
				<div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => { openModal() }}
					style={hover ? { backgroundColor: "#e0e0e0", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "default" }}>
					<User user={isAuthenticated().user} />
				</div>
				<Button className="rounded-0" onClick={() => signOut(() => { setRedirect(true) })}>Sair <i className="fa fa-sign-out"></i></Button>
			</Tab.Container>

			<Modal size="lg" onHide={closeModal} show={modalOpen}>
				<ProfileModal closeModal={closeModal} />
			</Modal>
		</div>
	)
}
