import { Container, IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { UserProfile } from "../../components/user-profile";
import { authFromNextPageCtx } from "../../lib/auth.ctx";
import { ProfileTraktDto } from "../../models/interfaces/trakt/entity.interface";
import { TraktService } from "../../services/trakt.service";

export type ProfileProps = { profile: ProfileTraktDto };

const Profile: NextPage<ProfileProps> = (
  props: PropsWithChildren<ProfileProps>
) => {
  const profile = props.profile;
  const router = useRouter();

  async function goBack() {
    await router.back();
  }

  return (
    <Container>
      <IconButton color="primary" onClick={goBack}>
        <Icon color={"primary"}>arrow_back</Icon>
        Back
      </IconButton>
      <UserProfile
        username={profile.username}
        age={profile.age}
        avatar={profile.images.avatar.full}
        gender={profile.gender}
        joined_at={profile.joined_at}
        location={profile.location}
        about={profile.about}
      />
    </Container>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const auth = authFromNextPageCtx(ctx);
  if (!auth) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const traktService = new TraktService(axios, auth);
  const profile = await traktService.getProfileInfos();

  return {
    props: {
      profile,
    },
  };
}
export default Profile;
