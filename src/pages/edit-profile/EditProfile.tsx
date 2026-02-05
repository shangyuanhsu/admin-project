import { useState } from 'react';
import { Input } from '../../components/Input';
import styles from './EditProfile.module.css';

export const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div>
            <h1>Edit Profile</h1>
            <section className={styles.section}>
                <form>
                    <div className={styles.formRow}>
                        <Input
                            title="name"
                            type="text"
                            value={name}
                            errorMessage="Please enter a valid name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            title="email"
                            type="email"
                            value={email}
                            errorMessage="Please enter a valid email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                </form>
            </section>
        </div>
    );
};