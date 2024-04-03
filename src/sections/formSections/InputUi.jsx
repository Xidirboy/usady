import {
	FormControl,
	//   FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import styled from 'styled-components';
import { eyeIcon } from '../../assets/authIcons';
import { reactSelectConfiguration } from '../../constants/constants';

const InputUiStyle = styled.div`
	& .chakra-form-control {
		padding-bottom: 20px;
		& .chakra-form__label {
			font-size: 18px;
			font-weight: 600;
			line-height: 29px;
			letter-spacing: 0.2px;
			text-align: left;
		}
		& .thin_label {
			font-weight: 500;
			@media (max-width: 768px) {
				font-size: 12.75px;
			}
		}
		& .chakra-input__group {
			& .chakra-input__left-element,
			& .chakra-input__right-element {
				height: 100%;
			}
			& .chakra-input__left-element {
				& svg {
					width: 20px;
					height: 20px;
				}
			}
			& .chakra-input__right-element {
				pointer-events: all;
				& button {
					padding: 5px;
					&:hover,
					&.show_eye {
						& svg {
							& path {
								fill: #235dff;
							}
						}
					}
				}
			}
			& .chakra-input,
			& .chakra-textarea,
			& .chakra-select {
				height: 60px;
				background: #fafafa;
				/* border: 1px solid #e0e0e0; */
				border-radius: 12px;
				font-size: 18px;
				font-weight: 500;
				line-height: 29px;
				letter-spacing: 0.2px;

				text-align: left;
				@media (max-width: 768px) {
					font-size: 12.75px;
				}
			}
			.chakra-input::placeholder {
				color: #9e9e9e;
			}
			& .chakra-select {
				box-shadow: none !important;
			}
			& .chakra-textarea {
				height: none;
				min-height: 200px;
				box-shadow: none !important;
			}
		}
	}
`;
const InputUi = ({ label, mask, placeholder = '', type = 'text', icon = null, name = '', value = '', onChange = () => {}, is_error = false, thin_label = false, options = [] }) => {
	const [showPass, setShowPass] = useState(false);
	return (
		<InputUiStyle>
			<FormControl>
				{label ? <FormLabel className={thin_label ? 'thin_label' : ''}>{label}</FormLabel> : null}
				<InputGroup>
					{icon ? <InputLeftElement pointerEvents='none'>{icon}</InputLeftElement> : null}
					{mask ? (
						<Input
							isInvalid={is_error}
							value={value}
							onChange={e => {
								onChange(e);
							}}
							name={name}
							as={InputMask}
							mask={mask}
							formatChars={{
								n: '[0-9]',
								a: '[A-Za-z]',
								'*': '[A-Za-z0-9]',
							}}
							placeholder={placeholder}
							focusBorderColor='#235dff'
						/>
					) : type === 'password' ? (
						<Input
							isInvalid={is_error}
							value={value}
							onChange={e => {
								onChange(e);
							}}
							name={name}
							type={showPass ? 'text' : 'password'}
							placeholder={placeholder}
							focusBorderColor='#235dff'
						/>
					) : type === 'textarea' ? (
						<Textarea
							isInvalid={is_error}
							value={value}
							onChange={e => {
								onChange(e);
							}}
							name={name}
							type={type}
							placeholder={placeholder}
							focusBorderColor='#235dff'
						/>
					) : type === 'select' ? (
						<Select
							menuPortalTarget={document.body}
							isInvalid={is_error}
							value={value}
							onChange={e => {
								onChange({ value: e?.value, label: e?.label });
								console.log(e, 'ay');
							}}
							options={options}
							name={name}
							type={type}
							placeholder={placeholder}
							{...reactSelectConfiguration}
							focusBorderColor='#235dff'
							style={icon ? { paddingLeft: 40 } : {}}
						/>
					) : (
						<Input
							isInvalid={is_error}
							value={value}
							onChange={e => {
								onChange(e);
							}}
							name={name}
							type={type}
							placeholder={placeholder}
							focusBorderColor='#235dff'
						/>
					)}
					{type === 'password' ? (
						<InputRightElement pointerEvents='none'>
							<button
								className={showPass ? 'show_eye' : ''}
								onClick={() => {
									setShowPass(showPass ? false : true);
								}}
							>
								{eyeIcon}
							</button>
						</InputRightElement>
					) : null}
				</InputGroup>
				{/* <FormHelperText>We'll never share your email.</FormHelperText> */}
			</FormControl>
		</InputUiStyle>
	);
};

export default InputUi;
