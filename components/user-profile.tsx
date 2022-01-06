import { Avatar, Container, Typography } from "@mui/material";
import React from "react";
import { dateFormatter } from "../lib/format";
import { Gender } from "../models/enum/gender.enum";
import GenderComponent from "./gender-component";

export interface UserProfileProps {
  username: string;
  gender?: Gender;
  location: string;
  avatar: string;
  age: number;
  joined_at: string;
  about?: string;
}

export interface UserProfileState {
  pageTitle: string;
}

export class UserProfile extends React.Component<
  UserProfileProps,
  UserProfileState
> {
  constructor(props: UserProfileProps) {
    super(props);
    this.state = {
      pageTitle: "Profil de l'utilisateur",
    };
  }

  public aboutSection = (
    <Typography
      align="justify"
      sx={{ marginTop: 2 }}
      variant="body2"
      component="div"
    >
      <span style={{ fontWeight: 700, fontSize: 24 }}>À propos : </span>
      <br />
      {this.props.about}
    </Typography>
  );

  render() {
    return (
      <Container>
        <Avatar
          alt="User avatar"
          src={this.props.avatar}
          sx={{ width: 156, height: 156, margin: "auto" }}
        />
        <Typography align="center" variant="h3">
          {this.props.username}
          <GenderComponent gender={this.props.gender}></GenderComponent>
        </Typography>
        <Typography align="center" variant="body1">
          {this.props.location} | inscrit depuis le :{" "}
          {dateFormatter(this.props.joined_at)} | {this.props.age} ans
        </Typography>
        {this.props.about ? this.aboutSection : undefined}
      </Container>
    );
  }
}
