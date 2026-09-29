from sqlalchemy import text
from database import engine


try:

    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT version();")
        )

        print("\n================================")
        print("POSTGRESQL CONNECTION SUCCESS")
        print("================================")
        print(result.fetchone())

except Exception as e:

    print("\n================================")
    print("POSTGRESQL CONNECTION FAILED")
    print("================================")
    print(e)