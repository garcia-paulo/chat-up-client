import React, { useRef } from 'react'
import { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { getContacts, getFavorites } from '../api/userApi'
import UserContact from './UserContact'
import { useAuth } from './contexts/AuthContext';

export default function Contacts() {
	const [contacts, setContacts] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [reload, setReload] = useState(true);
	const searchRef = useRef();

	const { isAuthenticated } = useAuth();

	const reloadPage = () => {
		setReload(true);
	}

	if (reload) {
		setReload(false);
		const search = searchRef.current ? (searchRef.current.value) : '';
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		getFavorites(userId, token, search)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					setFavorites(data);
				}
			})
		getContacts(userId, token, search)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					setContacts(data);
				}
			})
	}

	const handleSubmit = e => {
		e.preventDefault();

		const search = searchRef.current.value;
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		getFavorites(userId, token, search)
			.then(data => {
				if (data.error) {
					console.log(data.error);
				} else {
					setFavorites(data);
				}
			})
		getContacts(userId, token, search)
			.then(data => {
				if (data.error) {
					console.log(data.error)
				} else {
					setContacts(data);
				}
			})
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<InputGroup >
					<FormControl ref={searchRef} style={{ outline: 'none', boxShadow: 'none' }} type="text" className="rounded-0" placeholder="Usuário ou e-mail" />
					<InputGroup.Append>
						<Button type="submit" style={{ outline: 'none', boxShadow: 'none' }} className="rounded-0"><i className="fa fa-search"></i></Button>
					</InputGroup.Append>
				</InputGroup>
			</Form>

			{favorites.length > 0 && (
				<>
					<div className="mb-4">
						Favoritos
						{favorites.map((contact, i) => {
							return (
								<div key={i}>
									<UserContact user={contact} isFav={true} reload={reloadPage} />
								</div>
							)
						})}
					</div>
					Outros
				</>
			)}

			{contacts.map((contact, i) => {
				return (
					<div key={i}>
						<UserContact user={contact} isFav={false} reload={reloadPage} />
					</div>
				)
			})}
		</div>
	)
}
