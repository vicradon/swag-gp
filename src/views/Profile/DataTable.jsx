import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  Text,
  Flex,
  Grid,
  Input,
  useTheme,
  Button,
  useColorMode
} from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get } from '../utils/easy-storage';
import updateAccountDetails from '../http/update_account_details';
import getUserDetails from '../http/get_user_details';

const ProfileHead = () => {
  const [profileComplete] = useState(false);
  const { width, bp1 } = useSelector((state) => state.resize);
  const theme = useTheme();

  const {
    colors: { primary }
  } = theme;

  return (
    <Flex
      mb="-40.5px"
      bg={primary}
      w={width >= bp1 ? `${width - 600}px` : '90%'}
      h="84px"
      shadow="md"
      borderWidth="1px"
      flex="1"
      rounded="md"
      direction="column"
      p="1rem"
      borderColor={primary}
      zIndex="2"
      marginBottom="-5rem"
    >
      <Heading color="#fff" fontWeight="50" size="md">
        Edit Profile
      </Heading>
      {profileComplete ? '' : <Text color="#eee">Complete your profile</Text>}
    </Flex>
  );
};

const ProfileForm = () => {
  const { width, bp1, bp2 } = useSelector((state) => state.resize);
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const {
    colors: { primary }
  } = theme;

  const { name, email, phone, bio, address } = get('smefund-user');

  const [formState, alterFormState] = useState({
    name,
    email,
    phone,
    bio,
    address
  });

  useEffect(() => {
    (async () => {
      const { _id: id } = get('smefund-user');
      const token = get('token');
      const userDetails = await getUserDetails(id, token);
      if (userDetails.status === 200) {
        const values = userDetails.data.data;
        alterFormState({
          name: values.name,
          email: values.email,
          phone: values.phone,
          bio: values.bio,
          address: values.address
        });
      }
    })();
  }, []);

  const [wasAltered, setWasAltered] = useState(false);

  const handleChange = (event) => {
    setWasAltered(true);
    if (event.target.name === 'address' && event.target.value === '') {
      toast.error('You must supply the address');
    } else if (event.target.name === 'phone' && event.target.value === '') {
      toast.error('You must supply the phone');
    } else if (event.target.name === 'bio' && event.target.value === '') {
      toast.error('You must supply the bio');
    } else {
      alterFormState({ ...formState, [event.target.name]: event.target.value });
    }
  };

  const updateUserDetails = async () => {
    if (formState.address === '') {
      toast.error('You must supply the address');
    }
    if (formState.phone === '') {
      toast.error('You must supply the phone');
    }
    if (formState.bio === '') {
      toast.error('You must supply the bio');
    }
    if (formState.bio !== '' && formState.address !== '' && formState.phone !== '') {
      const res = await updateAccountDetails(formState);
      if (res.status === 200) {
        toast.success('Successful');
      } else {
        toast.error(`Error: ${res}`);
      }
    }
  };

  return (
    <Grid
      p="2rem"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      pt="100.5px"
      borderTop="none"
      shadow="md"
      borderWidth="1px"
      flex="1"
      rounded="md"
      w={width >= bp1 ? `${width - 550}px` : '100%'}
      rowGap="2rem"
      mt="1rem"
    >
      <Grid columnGap="2rem" rowGap="1.5rem" templateColumns={width >= bp2 ? '1fr 1fr' : '1fr'}>
        <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <Input
            id="name"
            name="name"
            isReadOnly={true}
            value={formState.name}
            variant="flushed"
            placeholder="John Doe"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            id="email"
            name="email"
            isReadOnly={true}
            value={formState.email}
            variant="flushed"
            placeholder="hohn@doe.com"
          />
        </FormControl>
      </Grid>
      <Grid columnGap="2rem" rowGap="1.5rem" templateColumns={width >= bp2 ? '1fr 1fr' : '1fr'}>
        <FormControl>
          <FormLabel htmlFor="number">Phone Number</FormLabel>
          <Input
            type="number"
            name="phone"
            id="number"
            aria-describedby="phone-helper-text"
            onChange={handleChange}
            value={formState.phone}
            variant="flushed"
            placeholder="04928381943"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            name="address"
            aria-describedby="address-helper-text"
            type="text"
            onChange={handleChange}
            value={formState.address}
            variant="flushed"
            placeholder="No 52 railway street"
          />
        </FormControl>
      </Grid>

      <FormControl>
        <FormLabel htmlFor="bio">Bio</FormLabel>
        <Textarea
          id="bio"
          name="bio"
          isRequired={true}
          onChange={handleChange}
          variant="flushed"
          placeholder="I am a forex trader that wants to improve the country through investments"
          value={formState.bio}
        />
      </FormControl>

      <Button
        onClick={updateUserDetails}
        isDisabled={!wasAltered}
        width="100px"
        mt={4}
        backgroundColor={primary}
        color="white"
        type="submit"
      >
        Update
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>
  );
};

const DataTable = () => {
  return (
    <Grid justifyItems="center" rowGap="-5">
      <ProfileHead />
      <ProfileForm />
    </Grid>
  );
};

export default DataTable;
