
from django.core.mail import EmailMessage
import os

from greencloud.settings import EMAIL_HOST_FROM

class Util:
  @staticmethod
  def send_email(data):
    email = EmailMessage(
      subject=data['subject'],
      body=data['body'],
      from_email=EMAIL_HOST_FROM,
      to=[data['to_email']]
    )

    email.send()