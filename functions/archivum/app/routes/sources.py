from typing import Annotated, Literal

from fastapi import APIRouter, status
from pydantic import BaseModel, ConfigDict, EmailStr, Field, SecretStr

router = APIRouter(tags=['sources'])


class WhatsApp(BaseModel):
    model_config = ConfigDict(
        title='WhatsApp Source',
        json_schema_extra={
            'examples': [
                {
                    'type': 'whatsapp',
                    'number': '+393331234567',
                }
            ]
        },
    )

    type: Literal['whatsapp'] = Field(
        description='Source type.',
    )
    number: str = Field(
        description='Phone number of the WhatsApp account.',
        examples=['+393331234567'],
    )


class Email(BaseModel):
    model_config = ConfigDict(
        title='Email Source',
        json_schema_extra={
            'examples': [
                {
                    'type': 'email',
                    'email': 'johndoo@example.com',
                    'host': 'imap.gmail.com',
                    'port': 993,
                    'username': 'johndoo@example.com',
                    'password': 'app-password',
                    'use_ssl': True,
                }
            ]
        },
    )

    type: Literal['email'] = Field(
        description='Source type.',
    )
    email: EmailStr = Field(
        description='Email address associated with the mailbox.',
        examples=['johndoo@example.com'],
    )
    host: str = Field(
        description='IMAP server hostname.',
        examples=['imap.gmail.com'],
    )
    port: int = Field(
        default=993,
        description='IMAP server port.',
    )
    username: str = Field(
        description='Username used to authenticate with the IMAP server.',
        examples=['johndoo@example.com'],
    )
    password: SecretStr = Field(
        description='Password or app password used to authenticate with the IMAP server.',
    )
    use_ssl: bool = Field(
        default=True,
        description='Whether the IMAP connection should use SSL/TLS.',
    )


Source = Annotated[
    WhatsApp | Email,
    Field(
        discriminator='type',
        description='Source configuration.',
    ),
]


@router.post(
    '/',
    status_code=status.HTTP_201_CREATED,
    summary='Create source',
    description='Creates a new WhatsApp or Email source.',
    response_model=Source,
)
def create_source(source: Source) -> Source:
    return source
