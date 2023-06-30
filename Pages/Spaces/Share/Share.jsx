import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	TextInput,
	Button,
	TouchableOpacity
} from 'react-native';
import {color, theme} from "../../../assets/styles/style";
import {useContext, useEffect, useState} from "react";
import Text from "../../../Components/Text";
import {UserContext} from "../../../Context/UserContext";
import {useNavigation} from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import {fetchRoute} from "../../../Utils/auth";
import {Entypo, FontAwesome, Octicons} from "@expo/vector-icons";

export default function ShareSpace(){

	const userContext = useContext(UserContext);
	const mode = userContext.theme
	const navigation = useNavigation()
	const route = useRoute();
	const [userId, setUserId] = useState(userContext.userId);
	const place_id = route.params?.place.id;
	const place = route.params?.place;
	const [invites, setInvites] = useState([]);
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState([]);

	useEffect(() => {
		userList()
	}, [search]);

	useEffect(() => {
		inviteList()
	}, []);


	const share = async id => {
		const jsonData = {
			userTo_id : id,
			user_id : userId,
			place_id : place_id
		};
		console.log(jsonData)
		const response = await fetchRoute(
			'place/invite',
			'POST',
			jsonData,
			userContext.token
		);
		if(response){
			inviteList()
			userList()
		}
	}

	const userList = async () => {
		const jsonData = {
			name : search,
			place_id : place_id
		};
		const response = await fetchRoute(
			'user/find-by',
			'POST',
			jsonData,
			userContext.token
		);
		if(response){
			setUsers(response)
		}
	}

	const inviteList = async () => {
		const jsonData = {
			id : place_id
		};
		//le find-by-user c'est un find par place...
		const response = await fetchRoute(
			'invite/find-by-user',
			'POST',
			jsonData,
			userContext.token
		);
		if(response){
			setInvites(response)
			console.log("invites ", invites)
		}
	}

	const styles = StyleSheet.create({
		content : {
			marginTop: 4,
			width: "90%",
			alignSelf: "center",
			flex: 1
		},
		bottom : {
			backgroundColor: color[mode].background,
			zIndex: 10,
			width: "100%",
			height: "15%",
			marginTop : "auto",
			bottom: 0,
			alignItems: "center",
			justifyContent: "flex-start"
		},
		user : {
			width: "100%",
			padding: 8,
			borderRadius: 8,
			marginTop: 6,
			backgroundColor: color[mode].secondaryBackground,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-between",
			title : {
				fontSize: 14,
				fontWeight: "bold",
				color: color[mode].text
			},
			email : {
				color: color[mode].textSecondary
			},
			layout : {
				width: "100%",
				height: "60%"
			},
			div : {
				width: "90%"
			},
			incomming : {
				width: "100%",
				padding: 8,
				borderRadius: 8,
				marginTop: 6,
				backgroundColor: color[mode].yellow,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "flex-between",
				title : {
					fontSize: 14,
					fontWeight: "bold",
					color: color[mode].text
				},
				email : {
					color: color[mode].textSecondary
				},
			},
			accept : {
				width: "100%",
				padding: 8,
				borderRadius: 8,
				marginTop: 6,
				backgroundColor: color[mode].primary,
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "flex-between",
				title : {
					fontSize: 14,
					fontWeight: "bold",
					color: color[mode].light
				},
				email : {
					color: color[mode].lightgrey
				},
			},
		},
		userTop : {
		}
	})

	return(
		<>
			<ScrollView contentContainerStyle={[theme[mode].container, styles.content]}>
				<View style={[theme[mode].inputGroup, ]}>
					<TextInput style={theme[mode].inputGroup.input} onChangeText={setSearch} placeholder={"Cherchez un utlisateur"} value={search}/>
				</View>
				<View style={styles.userTop}></View>
				<ScrollView style={styles.user.layout}>
					{users.length>0 ?
						users.map(user =>
							place.createdBy == user.id ? "" :
								user.InvitesRecieved.length>0 ?
									user.InvitesRecieved.map(invite =>
										invite.place_id == place_id ?
											<TouchableOpacity style={(invite.isAccpected == true ? styles.user.accept : styles.user.incomming)} >
												<View style={styles.user.div}>
													<Text style={(invite.isAccpected == true ? styles.user.accept.title : styles.user.incomming.title)}>{user.first_name} {user.last_name}</Text>
													<Text style={(invite.isAccpected == true ? styles.user.accept.email : styles.user.incomming.email)}> {user.email}</Text>
												</View>
												{invite.isAccpected == true ?
													<FontAwesome name="check-circle" size={24} color="white" />
													:
													<Octicons name="hourglass" size={24} color="black" />}
											</TouchableOpacity>
											: ""
									) :
									<TouchableOpacity style={styles.user} onPress={() => share(user.id)} key={user.id}>
										<View style={styles.user.div}>
											<Text style={styles.user.title}>{user.first_name} {user.last_name}</Text>
											<Text style={styles.user.email}>{user.email}</Text>
										</View>
										<Entypo  style={styles.iconShare} name="share" size={22} color="black" />
									</TouchableOpacity>
						)
						: ""}
				</ScrollView>
			</ScrollView>
		</>
	)
}