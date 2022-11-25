import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
	body.modal-open { overflow:inherit; padding-right:inherit !important; }
	body {
		font-family: 'Roboto', sans-serif;
		font-size: 17px;
		background: ${({ theme }) => theme.body};
		color: ${({ theme }) => theme.text};
		transition: all 0.50s linear;
		h1 {
			color: ${({ theme }) => theme.color1};
			font-family: 'Ubuntu Mono', monospace;
		}
		a, a:hover { color: ${({ theme }) => theme.color1} }
		.body-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 100vh;
		}
		header {
			background: ${({ theme }) => theme.bg1};
			a, a:hover {color: ${({ theme }) => theme.color1};}
			a:hover::before {color: ${({ theme }) => theme.color1}; background: ${({ theme }) => theme.color1};}
			.line {background: ${({ theme }) => theme.text};}
			.item-list { 
				background: ${({ theme }) => theme.bg1}; 
				a:hover::before {
					color: ${({ theme }) => theme.color1}; 
					background: ${({ theme }) => theme.color1};
				}
			}
		}
		.wrap-projects {
			.project-card {
				background-color: ${({ theme }) => theme.bg1};
				border: 2px solid ${({ theme }) => theme.bg1};
				box-shadow: 1px 3px 10px -4px ${({ theme }) => theme.box_shadow};
				.project-card-actions {
					a, span {
						color: ${({ theme }) => theme.color1};
					}
				}
			}
		}
		.post-card {
			background-color: ${({ theme }) => theme.bg1};
			border: 2px solid ${({ theme }) => theme.bg1};
			box-shadow: 1px 3px 10px -4px ${({ theme }) => theme.box_shadow};
			.post-card-inner {
				color: ${({ theme }) => theme.text};
				.post-card-text::before {
					background: ${({ theme }) => theme.bg1};
				}
				.post-card-text::after {
					background: ${({ theme }) => theme.bg1};
				}
			}
		}
		.post-container {
			background: ${({ theme }) => theme.post_container};
			box-shadow: 1px 1px 8px -3px ${({ theme }) => theme.box_shadow};
		}
		.wrap-contact {
			background: ${({ theme }) => theme.bg1};
			.contact-container {
				.wrap-social {
					a {
						color: ${({ theme }) => theme.color1};
						border-color: ${({ theme }) => theme.body};
						background-color: ${({ theme }) => theme.body};
						box-shadow: 1px 1px 8px -3px ${({ theme }) => theme.box_shadow};
					}
				}
			}
		}
		.modal-content {
			background: ${({ theme }) => theme.body};
			
			height: 100%;
			.modal-header {
				border-bottom: ${({ theme }) => theme.modal_border};
			}
		}
		.carousel-caption-bottom {
			color: ${({ theme }) => theme.text};
		}
	}`