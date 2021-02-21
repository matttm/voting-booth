
# did we get an input value?
if [ "${VB_CERT_PASSWORD}" == "" ]; then
   echo "Please export VB_CERT_PASSWORD"
   exit
fi

# generate crt
openssl req -new -x509 -newkey rsa:2048 -sha256 -nodes -keyout certificate.key -days 3560 -out certificate.crt -config certificate.cnf

echo "Generate x509 certificate and key"

# convert crt to p12
openssl pkcs12 -export -in certificate.crt -inkey certificate.key -name localhost -password pass:${VB_CERT_PASSWORD} -out certificate.p12

echo "Converted copy of certificate to PCKS format"

# import p12 to jks store
keytool -importkeystore -srckeystore certificate.p12 -srcstoretype PKCS12 -srcstorepass ${VB_CERT_PASSWORD} -deststorepass ${VB_CERT_PASSWORD} -destkeystore keystore.jks 

echo "Generated Java keystore from PCKS certificate"

# moving store to record's resources
mv keystore.jks records-backend/src/main/resources

echo "Moved keystore to records server's resources"
