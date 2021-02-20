# generate crt
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout certificate.key -days 3560 -out certificate.crt -config certificate.cnf

# convert crt to p12
openssl pkcs12 -export -in certificate.crt -inkey certificate.key -name localhost -out certificate.p12

# import p12 to jks store
keytool -importkeystore -deststorepass password -destkeystore keystore.jks -srckeystore certificate.p12 -srcstoretype PKCS12