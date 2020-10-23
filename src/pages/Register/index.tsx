import Axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import RadioBox from '../../components/RadioBox';
import Select from '../../components/Select';

import './styles.css';

interface States {
  label: string;
  value: string;
}

interface StatesData {
  nome: string;
}

const Register: React.FC = () => {

  const history = useHistory();

  const [previewProfileImage, setPreviewProfileImage] = useState('');

  const [isPreview, setIsPreview] = useState(false);

  const [profileImage, setProfileImage] = useState<File[]>([]);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [states, setStates] = useState<Array<States>>([]);
  const [state, setState] = useState('');
  const [selectAddress, setSelectAddress] = useState('');
  const [address, setAddress] = useState('');
  const [interests, setInterests] = useState<Array<string>>([]);
  const [inputInterest, setInputInterest] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const handleSelectedImage = (event: ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) return;

    const selectedImage = Array.from(event.target.files);
    setPreviewProfileImage(URL.createObjectURL(selectedImage[0]));
    setProfileImage(selectedImage);
  }

  const handleInterests = (event: ChangeEvent<HTMLInputElement>) => {

    if (!event.target.value) {
      setInputInterest('');
      setInterests([]);
      return;
    }

    setInputInterest(event.target.value);
    const newInterests = event.target.value.split(',').filter(interest => interest !== '');
    setInterests(newInterests);
  }

  const removeInterest = (index: number) => {

    const newInterests = interests.filter((__, i) => index !== i);
    const newInputInterests = newInterests.join(",");

    setInputInterest(newInputInterests);
    setInterests(newInterests);
  }

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!isPreview) {
      setIsPreview(!isPreview);
      return;
    }

    const data = new FormData();
    data.append("profileImage", profileImage[0]);
    data.append("name", name);
    data.append("lastName", lastName);
    data.append("age", age);
    data.append("email", email);
    data.append("phone", phone);
    data.append("country", country);
    data.append("state", state);
    data.append("address", address);
    data.append("interests", String(interests));
    data.append("newsletter", String(newsletter));

    console.log(data);


    await Axios.post('/', data)
      .then(response => {
        console.log(response);
        history.push('/');
      })
      .catch(error => {
        console.log(error);
      });

  }

  useEffect(() => {

    if (country) {
      (async () => {
        Axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then(response => {
            const newStates = response.data.map((state: StatesData) => state.nome).sort();
            const ascStates = newStates.map((state: string) => {
              return {
                label: state,
                value: state
              }
            });

            setStates(ascStates);
          });

      })();
    }

  }, [country]);

  return (
    <div id="page-register">
      <div className="container">
        <Header title="Cadastro" />
        <main>
          <form onSubmit={handleSubmitForm}>
            {isPreview ? (
              <div className="preview">
                <div className="side">
                  {previewProfileImage && (
                    <>
                      <img src={previewProfileImage} alt="Profile" className="preview-profile-image" />
                      <label htmlFor="profile_image" className="edit-profile-image">Editar foto</label>
                      <input
                        onChange={handleSelectedImage}
                        type="file"
                        name="profile_image"
                        id="profile_image"
                      />
                    </>
                  )}

                  <button type="button" onClick={() => setIsPreview(!isPreview)}>Editar perfil</button>
                </div>
                <div className="side">
                  Eu sou <strong>{name} {lastName}</strong>,
                  eu tenho <strong>{(() => {
                    switch (age) {
                      case "13-19": return "menos de 20 anos";
                      case "20-29": return "menos de 30 anos";
                      case "30-45": return "menos de 46 anos";
                      case "45 e acima": return "tenho mais de 44 anos";
                    }
                  })()}</strong>, você pode enviar e-mails para <strong>{email}</strong>. Eu moro no estado do <strong>{state}</strong>. Eu gosto de <strong>{interests.join(', ')}</strong>. {newsletter && <strong>Por favor me envie newsletters.</strong>} Para me contatar ligue no telefone <strong>{phone}</strong>

                  <button type="submit">Confirmar</button>
                </div>
              </div>
            ) : (
                <div className="form">
                  <div className="side">

                    {profileImage && (
                      <img src={previewProfileImage} alt="Profile" className="preview-profile-image" />
                    )}

                    <label htmlFor="profile_image" className="profile-image">Carregue sua foto</label>
                    <input
                      onChange={handleSelectedImage}
                      type="file"
                      name="profile_image"
                      id="profile_image"
                    />
                  </div>
                  <div className="side">
                    <div className="col">
                      <Input
                        name="primeiro_nome"
                        label="Primeiro nome"
                        type="text"
                        value={name}
                        onChange={e => {
                          const filteredName = e.target.value.replace(/[^a-zA-Z]/g, '').substr(0, 20);
                          setName(filteredName);
                        }}
                        required
                      />
                      <Input
                        name="sobrenome"
                        label="Sobrenome"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <RadioBox
                      title="Idade"
                    >
                      <Radio
                        name="idade"
                        id="13-19"
                        label="13-19"
                        value="13-19"
                        checked={age === "13-19"}
                        onChange={e => {
                          setAge(e.target.value);
                        }}
                        required
                      />
                      <Radio
                        name="idade"
                        id="20-29"
                        label="20-29"
                        value="20-29"
                        checked={age === "20-29"}
                        onChange={e => {
                          setAge(e.target.value);
                        }}
                        required
                      />
                      <Radio
                        name="idade"
                        id="30-45"
                        label="30-45"
                        value="30-45"
                        checked={age === "30-45"}
                        onChange={e => {
                          setAge(e.target.value);
                        }}
                        required
                      />
                      <Radio
                        name="idade"
                        id="45 e acima"
                        label="45 e acima"
                        value="45 e acima"
                        checked={age === "45 e acima"}
                        onChange={e => {
                          setAge(e.target.value);
                        }}
                        required
                      />

                    </RadioBox>

                    <Input
                      name="email"
                      label="E-mail"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />

                    <Input
                      name="telefone"
                      label="Telefone"
                      type="number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />

                    <Select
                      label="País"
                      name="pais"
                      options={[
                        { label: "Brasil", value: "BR" }
                      ]}
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      required
                    />

                    {country && (
                      <Select
                        label="Estado"
                        name="estado"
                        options={states}
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                      />
                    )}

                    <Select
                      label="Endereço"
                      name="endereco"
                      options={[
                        { label: "Casa", value: "casa" },
                        { label: "Empresa", value: "empresa" },
                      ]}
                      value={selectAddress}
                      onChange={e => setSelectAddress(e.target.value)}
                      required
                    />

                    {selectAddress === "casa" && (
                      <Input
                        name="endereco_casa"
                        label="Endereço Casa"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                      />
                    )}

                    {selectAddress === "empresa" && (
                      <Input
                        name="endereco_empresa"
                        label="Endereço Empresa"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                      />
                    )}

                    <Input
                      name="interesse"
                      label="Interesse"
                      placeholder="Separe cada interesse com vírgula"
                      type="text"
                      value={inputInterest}
                      onChange={handleInterests}
                      required
                    />

                    {interests && (
                      <div className="interests-box">
                        {interests.map((interest, index) => (
                          <span key={`${interest}_${index}`} className="interest-item">
                            {interest}
                            <span onClick={() => removeInterest(index)}>X</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="checkbox-block">
                      <input
                        type="checkbox"
                        name="newsletter"
                        id="newsletter"
                        checked={newsletter}
                        onChange={e => setNewsletter(!newsletter)}
                      />
                      <label htmlFor="newsletter">Desejo receber novidade por e-mail.</label>
                    </div>

                    <button type="submit" className="preview-profile">
                      Salvar
                </button>
                  </div>
                </div>
              )}
          </form>
        </main>
      </div >
    </div >
  );
};

export default Register;
