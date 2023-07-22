from pydantic import BaseModel


class Icon(BaseModel):
    id: int
    icon: str
